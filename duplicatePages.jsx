if (app.documents.length == 0){
    alert ("Abrid un documento, seleccionad un objeto y volved a probar.");
    exit();
}

var myDoc = app.activeDocument;
var myPage = myDoc.layoutWindows[0].activePage;
var myPageId = myPage.id;
var myDialog = app.dialogs.add({name:"Duplicar páginas"});


with(myDialog.dialogColumns.add()){
        with(dialogRows.add()) {
            staticTexts.add({staticLabel:"Duplicar página seleccionada # " + myPage.name});
            var myIntBox = integerEditboxes.add({editValue:1, smallNudge:1, largeNudge:10});
            staticTexts.add({staticLabel:" veces\n"});
        }
        
        with(dialogRows.add()){
            var inverted = checkboxControls.add({staticLabel:'Páginas invertidas'});
        }
}

var myResult = myDialog.show();

if(myResult == true){
    var myNumber = myIntBox.editValue;
    if (myNumber < 1) {
        alert(myNumber + " es un número inválido.");
        exit();
    }
    
    var page = myDoc.pages.itemByID(myPageId); //Página inicial del script
    var inv = inverted.checkedState; // Aquí hay que leer el checkbox
    //alert(inverted.checkedState);
    
    if (inv == true) {
         for (i = 0; i < myNumber; i++) {
         myPage = myPage.duplicate(LocationOptions.BEFORE, myPage);
        }
    } else  {
        for (i = 0; i < myNumber; i++) {
        myPage = myPage.duplicate(LocationOptions.AFTER, myPage);
        }  
    }
}

myDialog.destroy();