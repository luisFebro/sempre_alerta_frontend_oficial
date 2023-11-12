// reference: https://material-ui.com/components/autocomplete/
import { useState, useEffect, Fragment, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import FilterIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getVar, { setVar } from "cache/indexedDB";
import isKeyPressed from "utils/event/isKeyPressed";
import useData from "init";
import useToken, { chooseHeader } from "auth/useToken";
import disconnect from "auth/access/disconnect";
// 1. Allow enter key to select the first result and filter it after that.
// Ideally, this first result needs to be highlighted.
const truncate = (name, leng) => window.Helper.truncate(name, leng);

const getStyles = ({ fieldBack, themeColor, txtFont, formWidth }) => ({
    asyncAutoSearch: {
        backgroundColor: fieldBack,
        color: themeColor,
        fontSize: txtFont,
        fontFamily: "var(--mainFont)",
    },
    icon: {
        color: themeColor,
        transform: "scale(1.6)",
        marginLeft: 5,
    },
    loadingIcon: {
        color: themeColor,
    },
    autocomplete: {
        width: formWidth,
    },
});

function highlightSearchResult(string, search) {
    const reg = new RegExp(search, "gi");
    let newString = string.replace(
        reg,
        `<span class="theme-back--default d-inline-block font-site text-white">${search}</span>`
    );
    newString = parse(newString.toLowerCase());
    return newString;
}

function handlePickedValuesHistory(pickedValue, options = {}) {
    const { offlineKey, maxHistory } = options;

    if (!offlineKey) return;

    getVar(offlineKey).then((data) => {
        if (data) {
            const dataArray = [pickedValue, ...data].filter(Boolean);
            const newValue = [...new Set(dataArray)]; // to avoid the array to turn into <object data="" type=""></object>

            if (data.length >= maxHistory) {
                data.pop();
                setVar({ [offlineKey]: newValue });
            } else {
                setVar({ [offlineKey]: newValue });
            }
        } else {
            setVar({ [offlineKey]: [pickedValue] });
        }
    });
}

// future: find a way to show suggestions for a query not matched with it, but have a list of data related to it like when user search for a category and a list of items from that category is shown up.
export default function AutoCompleteSearch({
    id = "autocomplete",
    autocompleteUrl,
    setData,
    noOptionsText = "",
    timeout = 5000,
    fieldBack = "#fff",
    themeColor = "var(--themeP)",
    txtFont = "1.1em",
    clearOnEscape = true,
    clearOnBlur = true,
    selectOnFocus = true,
    autoSelect = false,
    openOnFocus = true,
    freeSolo = false,
    placeholder = "Procure alguma coisa...",
    // formWidth = "100%",
    needArrowEndAdornment = false,
    needAuth = false,
    autoHighlight = true,
    offlineKey = "",
    maxHistory = 10,
    autoFocus = false,
    ignoreEmptyHist = true,
    disable,
    searchIcon = undefined, // fa icon name
    inputId = undefined, // id for working with focus
    showImgs = false,
    clearId, // clear field programmaticaly
    width = "100%",
    maxTruncateVal = 60,
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [newSearchUrl, setNewSearchUrl] = useState(autocompleteUrl);
    const [searchChange, setSearchChange] = useState("");
    const [loading, setLoading] = useState(false);
    const [needHistory, setNeedHistory] = useState(true);
    const [imgList, setImgList] = useState(null);
    const [init, setInit] = useState(true);

    const didUserStartTyping = Boolean(searchChange.length);

    const token = useToken();
    const { firstName: name } = useData();

    const styles = getStyles({
        fieldBack,
        themeColor,
        txtFont,
        formWidth: width,
    });

    const onSelectedValue = (pickedValue) => {
        setData((data) => ({
            ...data,
            selectedValue: pickedValue || "_cleared",
        }));
        handlePickedValuesHistory(pickedValue, { offlineKey, maxHistory });
    };

    const onSearchChange = (e) => {
        const currValue = e.target.value;
        setSearchChange(currValue);
    };

    // Select the first suggested item from the list
    const onKeyPress = (e) => {
        if (isKeyPressed(e, "Enter")) {
            if (options) {
                const selectFirst = options[0];
                onSelectedValue(selectFirst);
            }
        }
    };

    const getValuesHistory = () => {
        getVar(offlineKey).then((data) => {
            if (data) {
                setNeedHistory(true);
                setOptions(data);
                return;
            }

            if (!ignoreEmptyHist) setOptions([" "]);
        });
    };

    // reinit search programmatically https://github.com/mui/material-ui/issues/20553
    const inputRef = useRef(null);
    useEffect(() => {
        if (!clearId || !inputRef) return;

        setSearchChange("");

        const input = inputRef.current.querySelector("#" + id);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;
        nativeInputValueSetter.call(input, "");

        const inputEvent = new Event("input", { bubbles: true });
        input.dispatchEvent(inputEvent);
    }, [clearId, id, inputRef]);

    useEffect(() => {
        if (searchChange)
            setNewSearchUrl(`${autocompleteUrl}&search=${searchChange}`);
    }, [searchChange]);

    useEffect(() => {
        let active = true;
        let cancel;

        setNeedHistory(true);

        const stopRequest = setTimeout(() => {
            cancel();
            setLoading(false);
        }, timeout);

        const config = {
            url: newSearchUrl,
            method: "get",
            headers: chooseHeader({ token, needAuth }),
            cancelToken: new axios.CancelToken((c) => {
                cancel = c;
            }),
        };

        if (!init && !didUserStartTyping) {
            setNeedHistory(true);
            setInit(false);
            return;
        }

        if (open) setLoading(true);

        async function doRequest() {
            try {
                const response = await axios(config);

                clearTimeout(stopRequest);

                const responseData = showImgs
                    ? response.data
                    : Array.isArray(response.data);

                if (active && responseData) {
                    let targetData = response.data;

                    if (showImgs) {
                        targetData = targetData && targetData.names;
                        if (targetData && !targetData.length) {
                            setOptions(targetData);
                            return setLoading(false);
                        }

                        const thisImgs = response.data && response.data.imgs;
                        const imgsData = targetData.map((thisName, ind) => ({
                            id: thisName,
                            img: thisImgs[ind],
                        }));
                        setImgList(imgsData);
                    }

                    if (targetData.length === 0) {
                        setOptions([]);
                        // getValuesHistory();
                    } else {
                        setNeedHistory(false);
                        setOptions(targetData);
                        // if (didUserStartTyping) {
                        // }
                    }
                }

                setLoading(false);
            } catch (e) {
                if (axios.isCancel(e)) return;
                const res = e.response && e.response.status;
                if (res === 403 || res === 401) {
                    (async () => {
                        await disconnect();
                    })();
                }
                if (e.response) {
                    console.log(
                        `${JSON.stringify(e.response.data)}. STATUS: ${
                            e.response.status
                        }`
                    );

                    const status = e.response && e.response.status;
                    setLoading(false);
                }
            }
        }

        doRequest();

        return () => {
            cancel();
            clearTimeout(stopRequest);
            active = false;
        };
    }, [newSearchUrl, didUserStartTyping]);

    useEffect(() => {
        // if (!open) {
        //     // setOptions([]);
        // }
        // if (needHistory || searchChange.length === 0) {
        //     getValuesHistory();
        // }
    }, [open, needHistory, searchChange]);

    return (
        <Autocomplete
            ref={inputRef}
            id={id}
            style={styles.autocomplete}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event, value) => onSelectedValue(value)}
            getOptionSelected={(option, value) =>
                option.toLowerCase() === value.toLowerCase()
            }
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            loadingText="Carregando..."
            clearText="Limpar"
            closeText="Fechar"
            noOptionsText={
                didUserStartTyping
                    ? name
                        ? `${noOptionsText}, ${name}`
                        : `${noOptionsText}`
                    : name
                    ? `${name}, no aguardo da sua busca!`
                    : "No aguardo da sua busca!"
            }
            autoHighlight={autoHighlight}
            includeInputInList
            freeSolo={freeSolo}
            clearOnEscape={clearOnEscape}
            clearOnBlur={clearOnBlur}
            selectOnFocus={selectOnFocus}
            autoSelect={autoSelect}
            autoComplete
            openOnFocus={openOnFocus}
            renderOption={(option) => {
                const ultimateQuery = truncate(option, maxTruncateVal);
                const showImg = () => {
                    const foundImg = imgList.find((img) => img.id === option);
                    const ultimateImg = foundImg && foundImg.img;

                    return (
                        <Fragment>
                            {showImgs && (
                                <div className="d-inline-block ml-3">
                                    <img
                                        width={70}
                                        height={70}
                                        src={ultimateImg || "/img/error.png"}
                                        alt="foto item"
                                    />
                                </div>
                            )}
                        </Fragment>
                    );
                };

                return (
                    <div className="text-em-1-4 font-site">
                        {needHistory ? (
                            <HistoryIcon
                                style={{
                                    ...styles.icon,
                                    transform: "scale(1.3)",
                                    padding: "0px 3px",
                                }}
                                className="text-light-purple"
                            />
                        ) : (
                            <SearchIcon
                                style={{
                                    ...styles.icon,
                                    transform: "scale(1.3)",
                                    padding: "0px 3px",
                                }}
                                className="text-light-purple"
                            />
                        )}{" "}
                        {searchChange
                            ? highlightSearchResult(ultimateQuery, searchChange)
                            : ultimateQuery}
                        {showImgs && showImg()}
                    </div>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    style={styles.asyncAutoSearch}
                    placeholder={placeholder}
                    fullWidth
                    autoFocus={autoFocus}
                    onChange={onSearchChange}
                    onKeyPress={(e) => onKeyPress(e)}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        id: inputId,
                        type: "search",
                        style: {
                            fontSize: txtFont,
                            color: themeColor,
                            paddingRight: "10px",
                            borderRadius: 25,
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                {searchIcon ? (
                                    <FontAwesomeIcon
                                        icon={searchIcon}
                                        style={{
                                            ...styles.icon,
                                            transform: "scale(0.9)",
                                        }}
                                    />
                                ) : (
                                    <SearchIcon style={styles.icon} />
                                )}
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <Fragment>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={35}
                                    />
                                ) : null}
                                {needArrowEndAdornment
                                    ? params.InputProps.endAdornment
                                    : null}
                            </Fragment>
                        ),
                    }}
                />
            )}
            value={searchChange}
            ListboxProps={{ style: { maxHeight: 600, overflow: "auto" } }}
        />
    );
}

/* ARCHIVES
function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}
*/
