import fs from "fs"
import { join } from "path"
export default {
    read: (filename)=>{
        let data = fs.readFileSync(join(process.cwd(),"src","db", `${filename}.json`), "utf-8")
        data = JSON.parse(data)
        return data
    },
    write: (filename, data)=>{
        fs.writeFileSync(join(process.cwd(),"src","db", `${filename}.json`), JSON.stringify(data, null, 4))
        return true
    }
}