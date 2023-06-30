import React, { useEffect, useState } from 'react';

const EnergyLabel = ({ classes, selected, onSelect }) => {
  const [efficiencyClasses, setEfficiencyClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (classes) {
      setEfficiencyClasses(classes.split(','));
    }
    if (selected) {
      setSelectedClass(selected);
    }
  }, [classes, selected]);

  const handleSelect = (efficiencyClass) => {
    setSelectedClass(efficiencyClass);
    if (onSelect) {
      onSelect(efficiencyClass);
    }
  };

  const getColor = (efficiencyClass) => {

    if (!efficiencyClass) {
      return '#000';
    }

    switch (efficiencyClass.trim()) {
      case 'A':
        return '#009036';
      case 'B':
        return '#58ab27';
      case 'C':
        return '#b1c800';
      case 'D':
        return '#ffec00';
      case 'E':
        return '#fecc00';
      case 'F':
        return '#f29400';
      case 'G':
        return '#e2001a';
      case 'H':
        return '#b50317';
      case 'I':
        return '#a30215';
      case 'J':
        return '#49010A';
      default:
        return '#000';
    }
  }

  const getWidth = (idx, total) => {
    let baseWidth = 10;
    let increment = ((80 - baseWidth) / (total - 1));
    return `${baseWidth + (idx * increment)}%`;
  }

  const getTopOffset = (idx) => {
    // Assuming each label occupies 27px (20px height + 7px margin-top)
    return `${idx * 27}px`;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 border-2 border-gray-200 rounded-lg p-4 shadow-md">
    <h1 dir="rtl" className="text-right font-bold text-xl mb-4 text-gray-700">انتخاب سطح مصرف انرژی</h1>
    <div className="grid grid-cols-1  gap-4">
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="energy-label host">
        <div id="efficiency-class-container" className="efficiency-class-container" aria-hidden="true" dir="ltr">
          {efficiencyClasses.map((efficiencyClass, idx) => (
            <div
              className="efficiency-class"
              key={idx}
              style={{ backgroundColor: getColor(efficiencyClass), color: '#fff', width: getWidth(idx, efficiencyClasses.length) }}
              onClick={() => handleSelect(efficiencyClass)}
            >
              <span>{efficiencyClass.trim()}</span>
            </div>
          ))}
        </div>
        <div
          id="selected-efficiency"
          className={`selected-efficiency`}
          style={{ backgroundColor: getColor(selectedClass), color: '#fff', top: getTopOffset(efficiencyClasses.indexOf(selectedClass)) }}
        >
          <span>{selectedClass}</span>
        </div>
        <style jsx>{`
                :global(body) {
                    /* CSS custom properties */

                    /* Colors for efficiency classes */
                    --opaque-background-color: white;
                    --efficiency-class-background-1: #009036;
                    --efficiency-class-background-2: #58ab27;
                    --efficiency-class-background-3: #b1c800;
                    --efficiency-class-background-4: #ffec00;
                    --efficiency-class-background-5: #fecc00;
                    --efficiency-class-background-6: #f29400;
                    --efficiency-class-background-7: #e2001a;
                    --efficiency-class-background-8: #b50317;
                    --efficiency-class-background-9: #a30215;
                    --efficiency-class-background-10: #49010A;
                    --selected-efficiency-background: #cccccc;

                    /* Available efficiency classes (on the left) */
                    --efficiency-class-base-width: 4em;
                    --efficiency-class-height: 20px;
                    --efficiency-class-margin-top: 7px;

                    --efficiency-class-label-margin: 0 0 0 0.5em;
                    --efficiency-class-label-font-family: sans-serif;
                    --efficiency-class-label-font-size: 12px;
                    --efficiency-class-label-font-weight: bold;
                    --efficiency-class-label-color: black;

                    /* Selected efficiency class (on the right) */
                    --selected-efficiency-width: 6em;
                    --selected-efficiency-height: 30px;
                    --selected-efficiency-label-margin: 0 1em 0 0;
                    --selected-efficiency-label-font-family: sans-serif;
                    --selected-efficiency-label-font-size: 18px;
                    --selected-efficiency-label-font-weight: bold;
                    --selected-efficiency-label-color: black;

                    /* Pre-calculated CSS custom properties to avoid redundant calculations. */
                    --efficiency-class-height-half: calc(var(--efficiency-class-height) / 2);
                    --selected-efficiency-height-half: calc(var(--selected-efficiency-height) / 2);
                    --selected-efficiency-height-difference: calc(var(--efficiency-class-height-half) - var(--selected-efficiency-height-half));
                    --efficiency-class-margin-top-and-height: calc(var(--efficiency-class-margin-top) + var(--efficiency-class-height));
                }
                /* Remaining CSS exactly as it is in the provided CSS, just replace :host with .host and replace all var(--*) with var(--*) */

                .host {
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    background-color: var(--opaque-background-color);
                    
                }

                .efficiency-class {
                  position: relative;
                  height: var(--efficiency-class-height);
                  margin-top: var(--efficiency-class-margin-top);
                  line-height: var(--efficiency-class-height);
                  color: var(--efficiency-class-label-color);
                  font-family: var(--efficiency-class-label-font-family);
                  font-size: var(--efficiency-class-label-font-size);
                  font-weight: var(--efficiency-class-label-font-weight);
              }

              .efficiency-class:after {
                  position: absolute;
                  top: 50%;
                  left: calc(100% - var(--efficiency-class-height-half));
                  width: 0;
                  height: 0;
                  border: solid var(--opaque-background-color);
                  border-left-color: transparent;
                  border-width: var(--efficiency-class-height-half);
                  border-right-width: 0;
                  margin-top: calc(var(--efficiency-class-height-half) * -1);
                  content: " ";
              }

              .efficiency-class span {
                  margin: var(--efficiency-class-label-margin);
              }

              /* Repeat the .efficiency-class nth-of-type style rule with the appropriate calculations */

              .selected-efficiency {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: var(--selected-efficiency-width);
                  height: var(--selected-efficiency-height);
                  margin-top: var(--efficiency-class-margin-top);
                  line-height: var(--selected-efficiency-height);
                  background: var(--selected-efficiency-background);
                  color: var(--selected-efficiency-label-color);
                  font-family: var(--selected-efficiency-label-font-family);
                  font-size: var(--selected-efficiency-label-font-size);
                  font-weight: var(--selected-efficiency-label-font-weight);
                  text-align: right;
                  transition: top 0.5s;
              }

              .selected-efficiency:after {
                  position: absolute;
                  top: 50%;
                  right: calc(100% - var(--selected-efficiency-height-half));
                  width: 0;
                  height: 0;
                  border: solid var(--opaque-background-color);
                  border-width: var(--selected-efficiency-height-half);
                  border-left-width: 0;
                  border-right-color: transparent;
                  margin-top: calc(var(--selected-efficiency-height-half) * -1);
                  content: " ";
              }

              .selected-efficiency span {
                  margin: var(--selected-efficiency-label-margin);
              }

              /* Repeat the .selected-efficiency-* style rule with the appropriate calculations */

              .hidden {
                  display: none;
              }
             
              `}</style>
      </div>
    </div>
    </div>
    </div>
  );
};

export default EnergyLabel;