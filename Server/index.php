<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Side</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://use.fontawesome.com/ecca4b3085.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/style.css"> </head>

<body>
    <div class="wrapper">
        <header>
            <nav class="navbar navbar-default ">
                <div class="container">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#">Server Side</a> </div>
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form class="navbar-form navbar-right">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Search"> </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                    </div>
                    <!-- /.navbar-collapse -->
                </div>
                <!-- /.container-fluid -->
            </nav>
        </header>
        <div class="row">
            <div class="col-sm-9">
                <main>
                    <div class="col-lg-12">
                        <h4 class="page-header">Root Gallery</h4></div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img onclick="getImgSrc(this)" class="img-responsive" src="./img/Capture.JPG" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/7821509496_51b6f6314a.jpg" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/Capture3.JPG" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/demo_small.png" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/one.png" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/Untitled-1.png" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/demo_small.png" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/demo_small.png" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/demo_small.png" alt="..."> </a>
                    </div>
                    <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                        <a href="#" class="thumbnail"> <img class="img-responsive" src="./img/demo_small.png" alt="..."> </a>
                    </div>
                </main>
            </div>
            <div class="col-sm-3">
                <aside>
                    <br>
                    <h6 id="olalal" class="text-center">Image Information</h6>
                    <ul id="infolist" class="list-group">
                        <li class="list-group-item">asdasdasd</li>
                        <li class="list-group-item">asdasdasd</li>
                    </ul>
                    <p>asdasd</p>
                </aside>
            </div>
        </div>
        <?php

	// Adds pretty filesizes
	function pretty_filesize($file) {
		$size=filesize($file);
		if($size<1024){$size=$size." Bytes";}
		elseif(($size<1048576)&&($size>1023)){$size=round($size/1024, 1)." KB";}
		elseif(($size<1073741824)&&($size>1048575)){$size=round($size/1048576, 1)." MB";}
		else{$size=round($size/1073741824, 1)." GB";}
		return $size;
	}

 	// Checks to see if veiwing hidden files is enabled
	if($_SERVER['QUERY_STRING']=="hidden")
	{$hide="";
	 $ahref="./";
	 $atext="Hide";}
	else
	{$hide=".";
	 $ahref="./?hidden";
	 $atext="Show";}
        $path = "./img/";
	 // Opens directory
	 $myDirectory=opendir("./img/");

	// Gets each entry
	while($entryName=readdir($myDirectory)) {
	   $dirArray[]=$entryName;
	}

	// Closes directory
	closedir($myDirectory);

	// Counts elements in array
	$indexCount=count($dirArray);

	// Sorts files
	//sort($dirArray);
  //  usort($dirArray, function($a, $b) {
  //  return filemtime($path.$a) < filemtime($path.$b);
//}); 

for($i=0; $i < $indexCount; $i++) {
    for($j=0; $j < $i; $j++) {
        if(filemtime($path.$dirArray[$i]) > filemtime($path.$dirArray[$j])){
            $file=$dirArray[$i];
            $dirArray[$i]=$dirArray[$j];
            $dirArray[$j]=$file;
        }
    }
}
	// Loops through the array of files
	for($index=0; $index < $indexCount; $index++) {

	// Decides if hidden files should be displayed, based on query above.
	    if(substr("$dirArray[$index]", 0, 1)!=$hide) {

	// Resets Variables
		$favicon="";
		$class="file";

	// Gets File Names
		$name=$path.$dirArray[$index];
		$namehref=$path.$dirArray[$index];

	// Gets Date Modified
           
		$modtime=date("M j Y g:i A", filemtime($path.$dirArray[$index]));
		$timekey=date("YmdHis", filemtime($path.$dirArray[$index]));


	// Separates directories, and performs operations on those directories
		if(is_dir($dirArray[$index]))
		{
				$extn="&lt;Directory&gt;";
				$size="&lt;Directory&gt;";
				$sizekey="0";
				$class="dir";

			// Gets favicon.ico, and displays it, only if it exists.
				if(file_exists("$namehref/favicon.ico"))
					{
						$favicon=" style='background-image:url($namehref/favicon.ico);'";
						$extn="&lt;Website&gt;";
					}

			// Cleans up . and .. directories
				if($name=="."){$name=". (Current Directory)"; $extn="&lt;System Dir&gt;"; $favicon=" style='background-image:url($namehref/.favicon.ico);'";}
				if($name==".."){$name=".. (Parent Directory)"; $extn="&lt;System Dir&gt;";}
		}

	// File-only operations
		else{
			// Gets file extension
			$extn=pathinfo($dirArray[$index], PATHINFO_EXTENSION);

			// Prettifies file type
			switch ($extn){
				case "png": $extn="PNG Image"; break;
				case "jpg": $extn="JPEG Image"; break;
				case "jpeg": $extn="JPEG Image"; break;
				case "svg": $extn="SVG Image"; break;
				case "gif": $extn="GIF Image"; break;
				case "ico": $extn="Windows Icon"; break;

				case "txt": $extn="Text File"; break;
				case "log": $extn="Log File"; break;
				case "htm": $extn="HTML File"; break;
				case "html": $extn="HTML File"; break;
				case "xhtml": $extn="HTML File"; break;
				case "shtml": $extn="HTML File"; break;
				case "php": $extn="PHP Script"; break;
				case "js": $extn="Javascript File"; break;
				case "css": $extn="Stylesheet"; break;

				case "pdf": $extn="PDF Document"; break;
				case "xls": $extn="Spreadsheet"; break;
				case "xlsx": $extn="Spreadsheet"; break;
				case "doc": $extn="Microsoft Word Document"; break;
				case "docx": $extn="Microsoft Word Document"; break;

				case "zip": $extn="ZIP Archive"; break;
				case "htaccess": $extn="Apache Config File"; break;
				case "exe": $extn="Windows Executable"; break;

				default: if($extn!=""){$extn=strtoupper($extn)." File";} else{$extn="Unknown";} break;
			}

			// Gets and cleans up file size
				$size=pretty_filesize($path.$dirArray[$index]);
				$sizekey=filesize($path.$dirArray[$index]);
		}

	// Output
	 echo("
		<tr class='$class'>
			<td><a href='Uploads/$namehref' class='name'>$name</a></td>
			<td><a href='Uploads/$namehref'>$extn</a></td>
			<td sorttable_customkey='$sizekey'><a href='Uploads/$namehref'>$size</a></td>
			<td sorttable_customkey='$timekey'><a href='Uploads/$namehref'>$modtime</a></td>
		</tr>");
	   }
	}
	?>
            <footer class="navbar navbar-fixed-bottom text-center"> &copy;2016 cgossip.in </footer>
    </div>
    <style>

    </style>
    <script>
        function getImgSrc(param) {
            var imgSrc = $(param).attr("src");
            $("#infolist").empty();
            $("#infolist").append("<li class=\"list-group-item\">" + "Image Source :  " + imgSrc + "</li>");
            // $('#infolist ul').append($('<li>').append("ghjghj"));
        }
    </script>
</body>

</html>