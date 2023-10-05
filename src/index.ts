import { Model, QueryBuilder, Page } from "objection";

class MyQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  public ArrayQueryBuilderType!: MyQueryBuilder<M, M[]>;
  public SingleQueryBuilderType!: MyQueryBuilder<M, M>;
  public MaybeSingleQueryBuilderType!: MyQueryBuilder<M, M | undefined>;
  public NumberQueryBuilderType!: MyQueryBuilder<M, number>;
  public PageQueryBuilderType!: MyQueryBuilder<M, Page<M>>;

  public customFunc() {
    return 1;
  }
}

class BaseClass extends Model {
  public QueryBuilderType!: MyQueryBuilder<this>;
  public static QueryBuilder = MyQueryBuilder;

  public createdAt?: string;
  public updatedAt?: string;

  // Using a constructor definiion like this works:
  // constructor() {
  //   super();
  // }

  // Like this it doesn't work
  constructor(props?: { updatedAt?: string; createdAt?: string }) {
    super();
    this.updatedAt = props?.updatedAt;
    this.createdAt = props?.createdAt;
  }
  //

  // Like this it works
  // constructor(a: any) {
  //   super();
  // }

  // But not like this:
  // constructor(a: boolean) {
  //   super();
  // }
}

class Animal extends BaseClass {}

class Human extends BaseClass {
  public createdAt?: string;
  public updatedAt?: string;

  public pets!: Animal[];

  static relationMappings = {
    pets: {
      relation: Model.HasManyRelation,
      modelClass: Animal,
      join: {
        from: "animals.ownerId",
        to: "persons.id",
      },
    },
  };
}

function reproduction() {
  let qb = Human.relatedQuery("pets").withGraphJoined("human");
  qb.customFunc();
}

reproduction();
