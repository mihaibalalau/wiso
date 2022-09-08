import Wiso from "../../Wiso";

const RenderSlice = (config) => {
    let path;
    let hidden = false;

    return {
        hidden() {
            return hidden;
        },
        setHidden(value) {
            hidden = value;
        },
        path() {
            return path;
        },
        setPath(newPath) {
            path = newPath;
        },
        areaPath(wiso) {
            const path = this.refresh(wiso);

            this.components().forEach(component => {
                component
            })

            return path;
        },
        refresh: config.refresh || function (wiso) {
            const path = new Path2D();
            path.rect(...wiso.drawPosition(this).toArray(), wiso.drawWidth(this), wiso.drawHeight(this));

            return path;
        },
        render(wiso) {
            if (this.hidden()) {
                return null;
            }

            this.setPath(this.refresh(wiso));
            
            if (config.render) {
                config.render.call(this);
            } else {
                
                wiso.context.filter = '';
    
                if (this.isStroke()) {
                    wiso.context.lineWidth = 15;

                    wiso.stroke(this.path(), this.strokeColor())
                }

                if (this.isFill()) {
                    wiso.fill(this.path(), this.color())
                }
            }

            this.components().forEach(component => {
                    component.render(wiso);
            })

            this.children().forEach(child => {
                    child.render(wiso);
            })
        }
    }
}

export default RenderSlice;
