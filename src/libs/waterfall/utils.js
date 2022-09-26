/**
 * 从itemElements中抽离出所有img标签
 */
export const getImgElements = (itemElements)=>{
    const imgElements = []
    itemElements.forEach(el => {
        imgElements.push(...el.getElementsByTagName('img'))
    });
    return imgElements
}
/**
 * @description 生成所有图片的链接数组
 * @param {*} imgElements 
 * @returns 
 */
export const getAllImg = (imgElements) => {
    return imgElements.map(imgElement => {
        return imgElement.src
    })
}
/**
 * 根据图片链接判断是否加载完成
 * @param {*} imgs 
 * @returns promiseAll,  图片加载promise数组
 */
export const onCompleteImgs = (imgs)=>{
    // promise集合
    const promiseAll = []
    // 循环imgs， 构建promiseAll
    imgs.forEach((img, index)=>{
        promiseAll[index] = new Promise((resolve, reject)=>{
            // 处理img加载情况
            const imgObj = new Image()
            imgObj.src = img
            imgObj.onload = ()=>{
                resolve({
                    img,
                    index
                })
            }
        })
    })
    return Promise.all(promiseAll)
}
/**
 * 返回最小高度
 * @param {*} columnHeightObj 
 * @returns 
 */
export const getMinHeight = (columnHeightObj)=>{
    return Math.min(...Object.values(columnHeightObj)) 
}
/**
 * 返回最大高度
 * @param {*} columnHeightObj 
 * @returns 
 */
 export const getMaxHeight = (columnHeightObj)=>{
    return Math.max(...Object.values(columnHeightObj)) 
}
/**
 * 返回最小高度的列号
 * @param {*} columnHeightObj 
 * @returns 
 */
export const getMinHeightColumn = (columnHeightObj) => {
    // 拿到最小高度
    const minHeight = getMinHeight(columnHeightObj)
    return Object.keys(columnHeightObj).find(key=>{
        return columnHeightObj[key] === minHeight
    })
}