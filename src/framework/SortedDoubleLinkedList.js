const Elem = (value) => {
    let next = null;
    let previous = null;

    return {
        value() {
            return value;
        },
        next() {
            return next;
        },
        setNext(elem) {
            next = elem;
        },
        previous() {
            return previous;
        },
        setPrevious(elem) {
            previous = elem;
        },
        insertAfter(elem) {
            const next = elem.next();

            if (next) {
                next.setPrevious(this);
                this.setNext(next);
            }

            elem.setNext(this);
            this.setPrevious(elem);
        },
        insertBefore(elem) {
            const previous = elem.previous();

            if (previous) {
                previous.setNext(this);
                this.setPrevious(previous);
            }

            elem.setPrevious(this);
            this.setNext(elem);
        },
        remove() {
            const previous = this.previous();
            const next = this.next();

            if (previous) {
                previous.setNext(next);
            }

            if (next) {
                next.setPrevious(previous);
            }

            this.setNext(null);
            this.setPrevious(null);
        }
    }
}



const SortedDoubleLinkedList = (compareValue) => {
    if (!compareValue || typeof compareValue !== "function") {
        throw new Error('compareValue is required!');
    }

    let head = null;
    let tail = null;


    return {
        head() {
            return head;
        },
        tail() {
            return tail;
        },
        count() {
            let count = 0;

            if (this.head()) {
                count++;

                let current = this.head();

                while (current.next()) {
                    current = current.next();
                    count++
                }
            }

            return count;
        },
        remove(elem) {
            if (elem === head) {
                head = head.next();
            }
            if (elem === tail) {
                tail = tail.previous();
            }
            elem.remove();
        },
        push(value) {
            const elem = Elem(value);

            if (!head) {
                head = elem;
                tail = elem;

                return elem;
            }

            let current = head;
            const elemValue = compareValue(value);

            if (elemValue < compareValue(current.value())) {
                elem.insertBefore(current);
                head = elem;

                return elem;
            }

            let insertAfter = false;

            while (elemValue >= compareValue(current.value())) {
                if (!current.next()) {
                    insertAfter = true;
                    break;
                }

                current = current.next();
            }

            if (insertAfter) {
                tail = elem;
                elem.insertAfter(current);
                return elem;
            }

            elem.insertBefore(current);
            return elem;

        },
        forEach(callback, reverse = false) {
            let current = reverse ? this.tail() : this.head();

            while (current) {
                callback(current.value());

                current = reverse ? current.previous() : current.next();
            }
        },
        find(callback) {
            this.forEach(elem => {
                if (callback(elem)) {
                    return elem.value();
                }
            })
            
            return null;
        },
        toArray(reverse = false) {
            let current = reverse ? this.tail() : this.head();
            const array = [];

            while (current) {
                array.push(current.value());

                current = reverse ? current.previous() : current.next();
            }

            return array;
        }
    }
}

export default SortedDoubleLinkedList;
