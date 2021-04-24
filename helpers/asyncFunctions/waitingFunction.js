exports.giveTextAfterWaiting = async (text) => {
    return new Promise(
        function (resolve, reject) {
            setTimeout(
                () => {
                    console.log("waiting finished")
                    let finalText = "(" + text + ")"
                    resolve(finalText);
                },
                1000
            );
        }
    );
}