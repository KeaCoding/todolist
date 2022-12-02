$(document).ready(function(){
    LoadData();
});

var arrayList =[
    {
        id:uuidv4(),
        desc:"Làm to do list",
        check:false
    },
    {
        id:uuidv4(),
        desc:"Làm to do list với jquery",
        check:true
    }
];

function GetList(){
    return arrayList;
}

function LoadData(){
    var html = "";

    var listData = GetList();
    
    if(listData.length <= 0){
        $(".todolist-item ul").html(html);
        return;
    }

    listData.forEach(x=>{
        html += '<li>';

        if(x.check){
            html += '<span class="desc"><s>'+ x.desc +'</s></span>';
        }else{
            html += '<span class="desc">'+ x.desc +'</span>';
        }

        html += '<div class="icon">';

        if(x.check){
            html += '<span class="close" onclick="EventClose(\''+ x.id +'\')"><i class="fa fa-times" aria-hidden="true"></i></span>';
            html += '<span class="trash" onclick="EventDelete(\''+ x.id +'\')"><i class="fa fa-trash" aria-hidden="true"></i></span>';
        }else{
            html += '<span class="check" onclick="EventCheck(\''+ x.id +'\')"><i class="fa fa-check" aria-hidden="true"></i></span>';
            html += '<span class="trash" onclick="EventDelete(\''+ x.id +'\')"><i class="fa fa-trash" aria-hidden="true"></i></span>';
        }

        html += '</div>';

        html += '</li>';
    });

    $(".todolist-item ul").html(html);
}

function EventAdd(){
    var v = $("#ip-note").val();

    if(v == "" || v == null || v == undefined){
        return;
    }

    var o = {
        id:uuidv4(),
        desc:v,
        check:false
    };

    arrayList.push(o);

    Refresh();
    LoadData();
}

function Refresh(){
    $("#ip-note").val("");
}

function EventClose(id){
    var listData = GetList();

    if(listData.length <= 0){
        return;
    }

    listData.forEach(x=>{
        if(x.id == id){
            x.check = false;
        }
    });

    arrayList = listData;

    LoadData();
}

function EventCheck(id){
    var listData = GetList();

    if(listData.length <= 0){
        return;
    }

    listData.forEach(x=>{
        if(x.id == id){
            x.check = true;
        }
    });

    arrayList = listData;

    LoadData();
}

function EventDelete(id){
    var listData = GetList();

    if(listData.length <= 0){
        return;
    }

    var result = [];

    listData.forEach(x=>{
        if(x.id != id){
            result.push(x);
        }
    });

    arrayList = result;

    LoadData();
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
       (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
   );
}