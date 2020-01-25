const Mutations = {
    async createItem(parent, args, ctx,info){
    //todo: check if they are logged in
    const item = ctx.db.mutation.createItem({
        data: {
            ...args

        }
    }, info)

    console.log(item)
    return item;
    } ,
     updateItem(parent, args, ctx, info){
        //first take the a copy of the updates
        const updates = {...args};
        //remve Id from updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem(
            {
                data:updates,
                where:{
                    id:args.id,
                }
            },
            info
        );
   },
}
module.exports = Mutations;
