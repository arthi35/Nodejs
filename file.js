const fs=require("fs");
fs.readFile("./cool.txt","utf8",(err,content)=>{
    console.log("📚",content)
    });
    const niceQoute= "\n Make a everysday little less ordinarily😊";

fs.appendFile("./nice.txt",niceQoute,(err)=>{
    console.log("Completed writing!!!🧧");
});
const quote2="Live more,worryless😊";
console.log(process.argv)
const noOfFiles=process.argv[2];
for(let i=1;i<=noOfFiles;i++){
    fs.writeFile(`./backup/text-${i}.html`,quote2,(err)=>{
        console.log("Completed Writing!!!");
    })
}
fs.unlink("./delete-file.css",err=>{
    console.log("Deleted File!!!")
});
fs.readdir("./backup",(err,files)=>{
    console.log(files);
    files.forEach(fileName=>fs.unlink(`./backup/${fileName}`,err=>{
        console.log("Deleted File!!!")
    })
    );
    })