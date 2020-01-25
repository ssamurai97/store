//if query is exactly the same as both prisma and query 
//import forwardTo to your query 
//forwarto to db
const { forwardTo } = require('prisma-binding')

const Query = {
    items: forwardTo('db'),
    items: forwardTo('db'),
//    async items(parent, args, ctx, info){
//        const items = await ctx.db.query.items();
//        return items;
//    },

};



module.exports = Query;
