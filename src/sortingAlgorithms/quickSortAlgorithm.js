export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}
function quickSortHelper(
    array,
    lowIdx,
    highIdx,
    animations,
){
    let pivot = lowIdx;
    if (highIdx > lowIdx){
        pivot = Partition(array,lowIdx,highIdx,animations);
        quickSortHelper(array,lowIdx,pivot-1,animations);
        quickSortHelper(array,pivot+1,highIdx,animations);
    }
}

function Partition(
    array,
    lowIdx,
    highIdx,
    animations,
){
    let pivot_item = array[lowIdx];
    let left = lowIdx;
    let right = highIdx;
    while (left < right){
        while (array[left] <= pivot_item){
            animations.push([left, lowIdx, true]);
            left++;
        }
        while (array[right] > pivot_item){
            animations.push([right, lowIdx, false]);
            right--;
        }
        if (left<right){
            animations.push([left,right,array[right],array[left]]);
            let temp = array[right];
            array[right] = array[left];
            array[left] = temp;
        }
    }
    animations.push([lowIdx,right,array[right],pivot_item]);
    array[lowIdx] = array[right];
    array[right] = pivot_item;
    return right;
}
