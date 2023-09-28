

const LoadLocalStorage = () => {
    var saved = localStorage.getItem('items');

    if(saved) {  
        var x = JSON.parse(saved);
        // console.log(x)
        // x.forEach(function (value) {
        //     var inputCase = value.case;
        //     var nowFormat = value.date;
        //     var inputNotes = value.notes;
        //     var inputImage = value.image;
           
        // });
    }
}

export default LoadLocalStorage