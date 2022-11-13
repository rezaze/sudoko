import { makeCubes, showNumCube } from "./counter/makeCubes.counter.js";
import cubes from "./modules/cube.module.js";
const cubeBox = document.querySelector('.cube-box')
const resetIcon = document.querySelector('.reset-icon');
const checkBtn = document.querySelector('.check-btn');
const showTime = document.querySelector('.show-time');

resetIcon.style.display = 'none';

let cubeIndexBox = [];
let cubeValueArr = [];
let targetCubeBoxArr = [];
let cubeBoxCollectionArr = [];
let targetCubeArr = [];
let cubeCollectionArr = [];
let getVerticalValue = [];
let getHorizontalValue = [];
let cubesArr = [];
let beginCubeBox = null;
let beginCube = null;
let cubeBoxPreThree = null;
let cubePreThree = null;
let cubeValue = null;
let currectCubeIndex = null;
let currectCubeBoxIndex = null;
let conditionValidation = null;
let targetVerticalyCubeBoxArr = null;
let targetVerticalyCubeArr = null;
let verCubeBox = 0;
let verCube = 0;
let showMin = 0;
let showSec = 0;
let baseScore = 81 * 100;


makeCubes(cubeBox);

let cubeBars = document.querySelectorAll('.cube-bar');
let cubeNumberBar = document.querySelectorAll('.cube-number-bar');

cubeNumberBar.forEach((elemnt, index) => {
    elemnt.addEventListener('input', (event) => {
        cubeValue = event.target.value;
        if (+cubeValue) {
            currectCubeIndex = elemnt.getAttribute('currectindex');
            currectCubeBoxIndex = elemnt.parentElement.getAttribute('cubeboxindex');
            conditionValidation = elemnt.getAttribute('isvalid');
            setBolean(conditionValidation);


            // check in cube box 

            elemnt.parentElement.childNodes.forEach(eachCubeBar => {

                if (+cubeValue === +eachCubeBar.value) {
                    cubeValueArr.push({ value: +eachCubeBar.value, parentIndex: currectCubeBoxIndex });

                    if (count(cubeValueArr, +eachCubeBar.value, currectCubeBoxIndex) > 1) {
                        validationFalse(elemnt, cubeValueArr);

                    } else {
                        elemnt.disabled = true;
                        elemnt.classList.add('currect-value');
                    }
                }
            })

            // check horizontal line

            cubeBoxPreThree = currectCubeBoxIndex / 3;
            cubePreThree = currectCubeIndex / 3;

            (0 <= cubeBoxPreThree && cubeBoxPreThree < 1) ? beginCubeBox = 0 :
                (1 <= cubeBoxPreThree && cubeBoxPreThree < 2) ? beginCubeBox = 3 :
                    beginCubeBox = 6;

            (0 <= cubePreThree && cubePreThree < 1) ? beginCube = 0 :
                (1 <= cubePreThree && cubePreThree < 2) ? beginCube = 3 :
                    beginCube = 6


            cubeBoxCollectionArr = [...event.path[2].children];

            targetCubeBoxArr = cubeBoxCollectionArr.slice(beginCubeBox, beginCubeBox + 3);

            targetCubeBoxArr.forEach(cubeBox => {
                cubeCollectionArr = [...cubeBox.children];
                targetCubeArr = cubeCollectionArr.slice(beginCube, beginCube + 3);

                targetCubeArr.forEach(cube => {

                    if (cube.value === cubeValue) {
                        getHorizontalValue.push({
                            value: +cube.value,
                            rangeParent: [beginCubeBox, beginCubeBox + 1, beginCubeBox + 2],
                            rangeChild: [beginCube, beginCube + 1, beginCube + 2]
                        });

                        if (getCounter(getHorizontalValue, +cube.value, beginCubeBox, +cube.getAttribute('currectindex')) > 1) {
                            validationFalse(elemnt, getHorizontalValue)

                        } else {
                            if (!elemnt.className.includes('invaid-value')) {
                                elemnt.disabled = true;
                                elemnt.classList.add('currect-value');
                            }
                        }
                    }
                })
            })

            // check vertical line


            verCubeBox = currectCubeBoxIndex % 3;
            verCube = currectCubeIndex % 3;

            targetVerticalyCubeBoxArr = [...[
                cubeBoxCollectionArr[verCubeBox],
                cubeBoxCollectionArr[verCubeBox + 3],
                cubeBoxCollectionArr[verCubeBox + 6]
            ]];

            targetVerticalyCubeBoxArr.forEach(cubeBox => {
                cubeCollectionArr = [...cubeBox.children];

                targetVerticalyCubeArr = [...[
                    cubeCollectionArr[verCube],
                    cubeCollectionArr[verCube + 3],
                    cubeCollectionArr[verCube + 6]]];

                targetVerticalyCubeArr.forEach(cube => {

                    if (cube.value === cubeValue) {
                        getVerticalValue.push({
                            value: +cube.value,
                            rangeParent: [verCubeBox, verCubeBox + 3, verCubeBox + 6],
                            rangeChild: [verCube, verCube + 3, verCube + 6]
                        });

                        if (getCounter(getVerticalValue, +cube.value, verCubeBox, +cube.getAttribute('currectindex')) > 1) {
                            validationFalse(elemnt, getHorizontalValue);

                        } else {
                            if (!elemnt.className.includes('invaid-value')) {
                                elemnt.disabled = true;
                                elemnt.classList.add('currect-value');
                            }
                        }
                    }

                })


            })

        } else {
            event.target.value = cubeValue.slice(0, -1);
        }

    })
});


// check every value when click the button and save the result in localstorage


checkBtn.addEventListener('click', e => {

    cubesArr = [...cubeNumberBar];

    cubesArr.forEach(cube => {
        !cube.value && cube.classList.add('empty-value');
        let removeEmptyValue = setTimeout(() => {
            cube.classList.remove('empty-value');
            clearTimeout(removeEmptyValue);
        }, 1500)
    });

    let checkEveryValue = cubesArr.every(cube => cube.value);

    if (checkEveryValue) {
        cubeBox.classList.add('win-style');
        clearInterval(timer);
       var finalScore = baseScore - ((+showTime.innerHTML.split(':')[0] * 60) + (+showTime.innerHTML.split(':')[1]));
    }
})


// show timer 

let timer = setInterval(() => {
    showSec++;
    if (showSec >= 60) {
        showSec = 0;
        showMin++;
    }

    showTimerText(showMin, showSec)
}, 1000)

// functions 

function validationFalse(elemnt, arr) {
    elemnt.classList.remove('currect-value');
    cubeNumberBar.forEach(cube => cube.disabled = true);
    cubeBox.classList.add('incurrect-value');
    elemnt.style.boxShadow = '1px 1px 3px 1px red inset';
    elemnt.style.color = 'red';
    resetIcon.style.display = 'block';
    resetIcon.addEventListener('click', e => window.location.reload())
}

function getCounter(arr, value, beginIndex, currectIndex) {
    let count = 0;
    for (let key in arr) {
        (arr[key].value === value && arr[key].rangeParent.includes(beginIndex) && arr[key].rangeChild.includes(currectIndex)) && count++;
    }
    return count;
}

function count(arr, value, parentValue) {
    let count = 0;
    for (let key in arr) {
        (arr[key].value === value && arr[key].parentIndex === parentValue) && count++;
    }
    return count;
}

function setBolean(conVal) {
    conVal === 'false' ? conVal = false : conVal = true;
}

function showTimerText(min, sec) {
    (min < 10 && sec < 10) ? showTime.innerHTML = `0${min}:0${sec}` :
        (min < 10) ? showTime.innerHTML = `0${min}:${sec}` :
            (sec < 10) ? showTime.innerHTML = `${min}:0${sec}` :
                showTime.innerHTML = `${min}:${sec}`
}



