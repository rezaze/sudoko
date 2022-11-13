import cubes from "../modules/cube.module.js";

function makeCubes(cubeBox) {
    cubes.forEach((cube, index) => {
        cubeBox.innerHTML += `<div cubeboxindex='${index}' class="cube-bar"></div>`;
        let cubeBars = document.querySelectorAll('.cube-bar');
        if (cubeBars.length === 9) {
            cubeBars.forEach((cubeBar) => {
                cube.forEach(miniCube => showNumCube(miniCube, cubeBar))
            })
        }

    })
}

function showNumCube(miniCube, cubeBar) {
       cubeBar.innerHTML += `<input maxlength="1" min="1" isvalid="${miniCube.isValid}" currectindex="${miniCube.id}" max="9" class="cube-number-bar" value="${miniCube.value}">` 
}

export { makeCubes, showNumCube };