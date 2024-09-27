import {pdfTextExtract} from "@fdocs/pdf"
import fs from 'fs'
 pdfTextExtract("../../data/MTTQ_10-12.pdf").then((res)=> 
    fs.writeFileSync("output.txt",JSON.stringify(res.getRaw,null, 2)))
