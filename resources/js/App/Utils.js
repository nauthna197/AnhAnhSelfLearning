export default {

    convertTypeVocabulary(type) {
        switch (type) {
            case 1:
                return "v";
            case 2:
                return "n";
            case 3:
                return "adj";
            case 4:
                return "adv";
        }
    },
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
};
