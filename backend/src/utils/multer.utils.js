import multer from 'multer';
import path from 'path';

const storage =multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'/tmp');
    },
    filename:function(req,file,cb){
      const name=Date.now();

      cb(null,file.fieldname+'-'+name)
    }
});

export const upload=multer({storage:storage});