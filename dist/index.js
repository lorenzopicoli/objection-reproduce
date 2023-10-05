"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class MyQueryBuilder extends objection_1.QueryBuilder {
    customFunc() {
        return 1;
    }
}
class BaseClass extends objection_1.Model {
    static { this.QueryBuilder = MyQueryBuilder; }
    // Using a constructor definiion like this works:
    // constructor() {
    //   super();
    // }
    // Like this it doesn't work
    constructor(props) {
        super();
        this.updatedAt = props?.updatedAt;
        this.createdAt = props?.createdAt;
    }
}
class Animal extends BaseClass {
}
class Human extends BaseClass {
    static { this.relationMappings = {
        pets: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: Animal,
            join: {
                from: "animals.ownerId",
                to: "persons.id",
            },
        },
    }; }
}
function reproduction() {
    let qb = Human.relatedQuery("pets").withGraphJoined("human");
    qb.customFunc();
}
reproduction();
