// ref: https://codepen.io/febro/pen/jOvpoom?editors=1112
import { useEffect, useState, useRef } from "react";

export default function AnimatedRankingItems(props) {
    const [data, setData] = useState({
        initialPositions: null, // n2 array
    });

    const updateListId = props.updateListId;

    const currItems = props.children; // {$$typeof: Symbol(react.element), type: 'div', key: '3', ref: null, props: {…}, …}
    const { initialPositions } = data;

    let containerRef = useRef(); // containerRef.current is undefined when first loaded
    const container = containerRef.current;

    // update items and animate them
    useEffect(() => {
        if (!container) return;
        const newChild = returnNewChild(initialPositions);
        const newPositions = getElementPositions(newChild);

        if (newPositions) {
            Object.keys(newPositions).forEach((key) => {
                const newData = newPositions[key];
                let prevData;
                let deltaX;
                let deltaY;

                if (newData.isNewElement) {
                    deltaX = 0;
                    deltaY = -newData.clientRect.height / 4;
                } else {
                    // if first time, prevData is null, then set currData
                    prevData =
                        initialPositions && initialPositions[key]
                            ? initialPositions[key]
                            : newData;

                    deltaX = prevData.clientRect.left - newData.clientRect.left;
                    deltaY = prevData.clientRect.top - newData.clientRect.top;
                }

                // n1 - Window.requestAnimationFrame();
                // TEST TEMP - GLITCHING WITH REAL TIME
                // if (!newData.isNewElement) return;
                requestAnimationFrame(() => {
                    const child = container.children[newData.index];
                    if (child) {
                        child.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
                        child.style.transition = "all 0s";

                        if (newData.isNewElement) child.style.opacity = "0";

                        requestAnimationFrame(() => {
                            child.style.transition = "all 0.5s";
                            child.style.transform = "translate3d(0, 0, 0)";
                            if (newData.isNewElement) {
                                child.style.opacity = "1";
                            }
                        });
                    }
                });
            });

            setData((prev) => ({
                ...prev,
                initialPositions: newPositions,
            }));
        }
    }, [updateListId, container, props.children.length]);

    // HELPERS
    function getElementPositions(newChild = {}) {
        const containerChildren = Array.from(container.children);
        // console.log("containerChildren", containerChildren);
        const data = containerChildren.reduce((obj, el, index) => {
            obj[el.dataset.key] = {
                index,
                clientRect: el.getBoundingClientRect(), // n3
                isNewElement: newChild
                    ? newChild.key === currItems[index].key
                    : false,
            };

            return obj;
        }, {});

        return data;
    }

    // find new child that was added to the dom by diff against initial values on mount
    function returnNewChild(prevData) {
        const allKeys = prevData ? Object.keys(prevData) : [];
        const gotData = Boolean(allKeys.length);
        // console.log("allKeys", allKeys);
        // console.log("gotData", gotData);
        if (!gotData) return null;
        const newChild = currItems.filter(
            (item) => !allKeys.includes(item.key)
        );

        // console.log("currItems", currItems);
        return newChild && newChild[0];
    }
    // END HELPERS

    return (
        <>
            <div ref={containerRef} className="flex flex-col w-full">
                {props.children}
            </div>
        </>
    );
}

/*  NOTES

N1: requestAnimationFrame(callback) - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame 
The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
You should call this method whenever you're ready to update your animation onscreen. This will request that your animation function be called before the browser performs the next repaint. The number of callbacks is usually 60 times per second, but will generally match the display refresh rate in most web browsers as per W3C recommendation. requestAnimationFrame() calls are paused in most browsers when running in background tabs or hidden <iframe>s in order to improve performance and battery life.

n2: initialPositions exemple:
"initialPos" // [object Object] 
{
  "0": {
    "index": 0,
    "clientRect": {
      "x": 18,
      "y": 78,
      "width": 650,
      "height": 82.28571319580078,
      "top": 78,
      "right": 668,
      "bottom": 160.28571319580078,
      "left": 18
    },
    "isNewElement": false
  },
  "1": {
    "index": 1,
    "clientRect": {
      "x": 18,
      "y": 180.2857208251953,
      "width": 650,
      "height": 82.28571319580078,
      "top": 180.2857208251953,
      "right": 668,
      "bottom": 262.5714340209961,
      "left": 18
    },
    "isNewElement": false
  },
  "2": {
    "index": 2,
    "clientRect": {
      "x": 18,
      "y": 282.5714416503906,
      "width": 650,
      "height": 82.28571319580078,
      "top": 282.5714416503906,
      "right": 668,
      "bottom": 364.8571548461914,
      "left": 18
    },
    "isNewElement": false
  }
}


n3: {x: 278, y: 128.5, width: 650, height: 88, top: 128.5, width: 650, x: 278, y: 128.5}
*/

/* ARCHIVES

  useEffect(() => {
        if (!isInit) return;

        const newInitPositions = getElementPositions();
        const checkInit = newInitPositions
            ? Object.keys(newInitPositions).length
            : 0;
        setData((prev) => ({
            ...prev,
            initialPositions: newInitPositions,
            isInit: checkInit === 0,
        }));
    }, [container, isInit]);

*/
