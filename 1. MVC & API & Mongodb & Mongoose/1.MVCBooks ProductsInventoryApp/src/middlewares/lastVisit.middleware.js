
// export const setLastVisit= (req, res, next)=>{
//     // if cookie set, then add a local variable with last visit time date
//     if(req.cookies.LastVisit){
//         res.locals.LastVisit= new Date (req.cookies.LastVisit).tolocalString();
//     }
//     res.cookies("LastVisit", new Date().toISOString(), 
//     {
//         maxaAge: 2 * 24 * 60 * 60 * 1000,  
//     });
//     next();
// };

export const setLastVisit = (req, res, next) => {
    // 1. if cookie is set, then add a local variable with last visit time data.
  
    if (req.cookies.lastVisit) {
      res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    res.cookie('lastVisit',new Date().toISOString(),
      {
        maxAge: 2 * 24 * 60 * 60 * 1000,
      }
    );
    next();
  };
  