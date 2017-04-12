<?php
    header("Content-Type:application/json");
    //  获取时间  使用time()函数可以获得当前服务器的时间(时间戳)
    // date()函数可以格式化时间
    if($_GET["flag"]==1){
        $url = $_GET["url"];
        $today = date("Y-m-d",time());
        $url = str_replace("2016-08-20",$today,$url);
        echo file_get_contents($url);
    }else if($_GET["flag"]==2){
        //strtotime 获取前几天或者后几天的时间戳
        $url = $_GET["url"];
        $older = date("Y-m-d",strtotime($_GET["day"]."day"));
        $url = str_replace("2016-08-20",$older,$url);
        echo file_get_contents($url);
    }else if($_GET["flag"]==3){
        //先将json数据转成PHP数组
        //再将php数组处理成二维数组，最后再转成json
        $rec = file_get_contents($_GET["recUrl"]);
        $all = file_get_contents($_GET["allUrl"]);
        $recResult = json_decode($rec,true);
        $allResult = json_decode($all,true);
        $authors = array("rec"=>$recResult,"all"=>$allResult);
        echo json_encode($authors);
    }else{
        echo file_get_contents( $_GET["url"]);
    }
    //phpinfo() 可以获取详细的PHP信息 包括目录所支持的扩展很多信息
    //str_replace(find,replace,string)  替换字符串
   
?>