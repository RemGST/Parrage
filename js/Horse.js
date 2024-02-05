export default class Horse {
    constructor(id,name,stable,lastTrim,nextTrim,trimmed){
        this.id = id,
        this.name = name,
        this.stable = stable,
        this.lastTrim = lastTrim,
        this.nextTrim = nextTrim,
        this.trimmed = trimmed
    }

    get htmlString(){
        return `
    <tr>
        <td>
            ${this.name}
        </td>
        <td>
            ${this.stable}
        </td>
        <td>
        ${this.lastTrim}
        </td>
        <td>
        ${this.nextTrim}
        </td>
        <td>
            <input type="checkbox">
        </td>
    </tr>`
    }
}