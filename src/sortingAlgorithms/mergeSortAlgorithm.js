export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const arrayTemp = array.slice();
    mergeSortHelper(array, arrayTemp, 0, array.length - 1, animations);
    return animations;
  }
  
  function mergeSortHelper(
    arrayMain,
    arrayTemp,
    startIdx,
    endIdx,
    animations,
  ) {
    if (endIdx > startIdx) {
      const middleIdx = Math.floor((startIdx + endIdx) / 2);
      mergeSortHelper(arrayMain, arrayTemp, startIdx, middleIdx, animations);
      mergeSortHelper(arrayMain, arrayTemp, middleIdx + 1, endIdx, animations);
      doMerge(arrayMain, arrayTemp, startIdx, middleIdx + 1, endIdx, animations);
    }
  }
  
  function doMerge(
    arrayMain,
    arrayTemp,
    startIdx,
    middleIdx,
    endIdx,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx;
    let size = endIdx - startIdx + 1;
    while (i <= middleIdx-1 && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j,true]);
      animations.push([i, j,false]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      // animations.push([i, j]);
      if (arrayMain[i] <= arrayMain[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, arrayMain[i]]);
        arrayTemp[k++] = arrayMain[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, arrayMain[j]]);
        arrayTemp[k++] = arrayMain[j++];
      }
    }
    while (i <= middleIdx-1) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i,true]);
      animations.push([i, i,false]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      // animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, arrayMain[i]]);
      arrayTemp[k++] = arrayMain[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j,true]);
      animations.push([j, j,false]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      // animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, arrayMain[j]]);
      arrayTemp[k++] = arrayMain[j++];
    }
    for (let index = 0; index<=size; index++){
      arrayMain[endIdx] = arrayTemp[endIdx];
      endIdx--;
    }
  }
  