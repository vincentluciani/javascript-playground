exports.giveTextAfterWaiting = async (text) => {
    return new Promise(
        function (resolve, reject) {
            setTimeout(
                () => {
                    console.log("waiting finished")
                    resolve(text);

                },
                3000
            );
        }
    );
}