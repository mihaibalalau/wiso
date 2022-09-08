const RangeMap = (source, destination, value) => {
    const fromPercentage = (value - source.from) / (source.to - source.from);

    return fromPercentage * (destination.to - destination.from);
}

export default RangeMap;
