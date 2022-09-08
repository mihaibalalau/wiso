const IndexSlice = (config = {}) => {
    let index = config.index ?? 0;

    return {
        index() {
            return index
        },
        setIndex(newIndex) {
            index = newIndex
        },
    }
}

export default IndexSlice;
