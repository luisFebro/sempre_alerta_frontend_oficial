import { useState } from "react";
import AnimatedRankingList from "./alerts_list/AnimatedRankingList";

function getMarkerIcon({ iconColor }) {
    const finalIcon =
        '<svg id="map-svg-marker" style="display: inline-block;padding:0;margin:0;" preserveAspectRatio="none" height="40" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 41.009998">' +
        '<path d="m -8.5,-3 h 48 v 48 h -48 z m 0,0 h 48 v 48 h -48 z" fill="none" id="path2" />' +
        `<path d="M 5.5,12.14 8.36,15 c 1.83,-1.83 4.35,-2.96 7.14,-2.96 2.79,0 5.31,1.13 7.14,2.96 L 25.5,12.14 C 22.94,9.59 19.41,8 15.5,8 11.59,8 8.06,9.59 5.5,12.14 Z M 15.5,0 C 9.45,0 3.97,2.45 0,6.42 L 2.82,9.24 C 6.07,5.99 10.55,3.99 15.5,3.99 c 4.95,0 9.43,2 12.68,5.25 L 31,6.42 C 27.03,2.45 21.55,0 15.5,0 Z M 21.21,17.01 9.79,17 C 8.53,17 7.5,18.03 7.5,19.29 v 19.43 c 0,1.26 1.03,2.29 2.29,2.29 h 11.43 c 1.26,0 2.29,-1.03 2.29,-2.29 V 19.29 C 23.5,18.03 22.47,17.01 21.21,17.01 Z M 21.5,37 H 9.5 V 21 h 12 z" style="fill:${iconColor};width:100%;height:100%;" />` +
        `<path d="m 17.348825,28.96249 0.722603,0.775278 a 0.88861081,0.89471025 47.014061 0 1 -0.355341,1.447143 L 12.08356,33.227819 A 0.62143516,0.6257007 47.014061 0 1 11.451091,32.18794 l 3.019423,-2.814273 -0.567254,-0.647969 a 0.88861081,0.89471025 47.014061 0 1 0.06882,-1.2384 l 2.584399,-2.408806 a 0.88861081,0.89471025 47.014061 0 1 1.260371,0.04001 l 1.093801,1.173535 a 0.88861081,0.89471025 47.014061 0 1 -0.04863,1.260068 z" id="path420" style="fill:${iconColor};stroke-width:0.594437;width:100%;height:100%;" /></svg>`;

    const markerIcon = {
        url:
            "data:image/svg+xml;charset=utf-8," + encodeURIComponent(finalIcon),
        // These options below don't work with data str64
        // fillColor: "#1cf499",
        // fillOpacity: 1,
        // strokeWeight: 0,
        // rotation: 0,
        // anchor: window.google && new google.maps.Point(0, 0), // 0, 20 or 16, 16 ->  // set marker width and height
    };

    return markerIcon;
}

export default function AlertsMain() {
    const [listType, setListType] = useState("attempt"); // attempt or success

    const isSuccList = listType === "success";
    const isAllList = listType === "all";

    const connIcon = getMarkerIcon({ iconColor: "#1cf499" });
    const disconnIcon = getMarkerIcon({ iconColor: "#f8b2b2" });
    const connectingIcon = getMarkerIcon({ iconColor: "#fdf890" });

    const iconData = {
        connIcon,
        disconnIcon,
        connectingIcon,
    };

    const onLastConnChoice = (choice) => {
        setListType(choice);
    };

    const restartDefaultId = null;

    const lastConnTypesData = [
        {
            label: "Todos",
            val: "all",
        },
        {
            label: "Sem conexão",
            val: "attempt",
        },
        {
            label: "Com conexão",
            val: "success",
        },
    ];

    return (
        <section className="mx-3 mt-[200px]">
            <AnimatedRankingList listType={listType} {...iconData} />
        </section>
    );
}

/* ARCHIVED

<RadioBtns
                restartId={restartDefaultId}
                defaultVal={lastConnTypesData[0].val}
                data={lastConnTypesData}
                onChangeCallback={onLastConnChoice}
            />

*/
