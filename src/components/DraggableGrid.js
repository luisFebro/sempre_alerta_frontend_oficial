import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import sortArray from "utils/arrays/sortArray";
import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";

export default function DraggableGrid({
    rawData,
    reactList,
    getLayoutResult,
    targetElem, // target elem from the array list to be sorted
}) {
    const handleLayout = (layout) => {
        // layout response example, y ind finalLayout indicates the current position: [{"w":4,"h":2,"x":0,"y":2,"i":"blue","moved":false,"static":false},{"w":4,"h":2,"x":0,"y":0,"i":"pink","moved":false,"static":false},{"w":4,"h":2,"x":0,"y":4,"i":"red","moved":false,"static":false}]
        const treatedLayout = layout.map((elem) => ({
            pos: elem.y,
            i: elem.i,
        }));
        const finalLayout = sortArray(treatedLayout, { target: "pos" }); // [{"pos":0,"ind":"pink"},{"pos":2,"ind":"blue"},{"pos":4,"ind":"red"}]

        const res = finalLayout.map((elemLay) =>
            rawData.find((elemRaw) => elemRaw[targetElem].en === elemLay.i)
        );
        getLayoutResult(res);
    };

    return (
        <section className="container-center">
            <div className="grid-container">
                <ResponsiveGridLayout
                    onLayoutChange={(
                        layout
                        // oldItem,
                        // newItem,
                        // placeholder,
                        // e,
                        // element
                    ) => handleLayout(layout)}
                    className="layout"
                    layout={null}
                    width={500}
                    rowHeight={50}
                    margin={[0, 60]}
                    isResizable={false}
                    isDraggable={true}
                    useCSSTransforms={true} // Uses CSS3 translate() instead of position top/left. This makes about 6x faster paint performance
                    isBounded={true} // // If true and draggable, item will be moved only within grid.
                >
                    {reactList}
                </ResponsiveGridLayout>
            </div>
            <style jsx global>
                {`
                    .grid-container {
                        width: 500px;
                        margin: 0rem 1rem 3rem;
                    }

                    .layout div {
                        width: 100% !important;
                    }

                    @media screen and (min-width: 768px) {
                        .grid-container {
                            width: 500px !important;
                        }
                    }
                `}
            </style>
        </section>
    );
}
