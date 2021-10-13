const homeController = {

    getHome:(_,res)=>{

        const today = new Date();
        const imgURL = '/images/'+today.getDay()+today.getMonth()+today.getFullYear()+'.png';

        res.render("home",{img:imgURL});
    }
}

export default homeController;