import SortedDoubleLinkedList from "../SortedDoubleLinkedList";

const TreeSlice = () => {
    const children = SortedDoubleLinkedList(child => child.index());

    return {
        children() {
            return children;
        },
        push(item) {
            this.children().push(item);
        },
        remove(item) {
            item.remove();

            //TODO clear listeners
            for (const index in children) {
                if (children[index] === item) {
                    item.parent().children.splice(index, 1);
                    this.deafenAll(item);
                }
            }
        },
        findById(id) {
            let current =  this.children().head();

            while(current) {

                const result = current.value().findById(id);
                
                if (result) {
                    return result;
                }

                current = current.next();
            }
        
            return null;
        
        },
        // find(object) {
        //     return this.container.find(object);
        // },
    }
}

export default TreeSlice;
