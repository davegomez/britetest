let createDataset = date => ({
    value: Math.floor(Math.random() * (30 - 6) + 6),
    date: date.toISOString(),
});

let nextDate = date => {
    let d = typeof date === 'string' ? new Date(date) : date;
    return new Date(d.setDate(d.getDate() + 1));
};

let buildData = (count, initialDate = Date.now()) => {
    let data = [];
    let date = new Date(initialDate);

    for (let i = 0; i < count; i += 1) {
        data.push(createDataset(date));
        date = nextDate(date);
    }

    return data;
};

export let updateData = data => {
    let newData = {};
    newData.dataByTopic = data.dataByTopic.map(dataset => {
        let dates = dataset.dates.slice(1);
        dates.push(createDataset(nextDate(dates[dates.length - 1].date)));
        dataset.dates = dates;
        return dataset;
    });

    return newData;
};

export default ({
    dateCount,
    date,
    topicCount = 1,
    topicName = 'Test data',
}) => {
    let topics = [];
    for (let i = 0; i < topicCount; i += 1) {
        let isOneTopic = topicCount === 1;
        topics.push({
            topic: isOneTopic ? -1 : i,
            topicName: isOneTopic ? topicName : `${topicName} - ${i}`,
            dates: buildData(dateCount, date),
        });
    }
    return { dataByTopic: topics };
};
