import SortedDoubleLinkedList from "../../SortedDoubleLinkedList";



const TreeSlice = () => {
    let parent;
    let components = SortedDoubleLinkedList(item => item.index());
    let children = SortedDoubleLinkedList(item => item.index());

    return {
        parent() {
            return parent;
        },
        moveToParent(newParent) {
            parent.children().splice(parent.children().indexOf(this), 1)

            newParent.push(this);

            parent = newParent;
        },
        setParent(newParent) {
            parent = newParent;
        },
        children() {
            return children;
        },
        push(child) {
            child.setParent(this);

            children.push(child);
        },
        remove() {
            const parent = this.parent();

            if (parent) {
                parent.children().splice(parent.children().indexOf(this), 1);
                // this.deafenAll(item); 
                //TODO event hooks
                parent = null;
            }
        },
        isComponent() {
            return false;
        },
        components() {
            return components
        },
        pushComponent(component) {
            component.setParent(this);
            component.isComponent = () => true

            components.push(component);
        },
        findById(id) {
            if (this.id() === id) {
                return this;
            }

            let current = this.children().head();

            while(current) {
                const child = current.value();

                if (child.id() === id) {
                    return child;
                }
                
                const result = child.findById(id);

                if (result) {
                    return result
                }

                current = current.next();
            }

            current = this.components().head();

            while(current) {
                const child = current.value();

                if (child.id() === id) {
                    return child;
                }
                
                const result = child.findById(id);

                if (result) {
                    return result
                }

                current = current.next();
            }

            return null;
        }
    };
}

export default TreeSlice;
