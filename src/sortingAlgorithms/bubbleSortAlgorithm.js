export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, array.length - 1, animations);
    return animations;
  }
  function bubbleSortHelper(
    array,
    endIdx,
    animations,
  ) {
    for (let pass = endIdx; pass >= 0; pass--){
        for (let i = 0; i <= pass - 1; i++){
            if (array[i] > array[i+1]){
                animations.push([i,i+1,array[i+1],array[i]]);
                let temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;
            }
            else {
                animations.push([i,i+1]);
            }
        }
    }
  }