// prettier-ignore

app.get("/users/:id", 
  (
    request = Request(),
    response = Response(),
    id = Param("id", z.integer()),
    query = Query(z.object({ expand: z.boolean() })),
    user = Inject(getUser)
  ) =>
  async () => {
    return "hello";
  }
);

const getUser = (
  db = Inject(Database), 
  auth = Inject(authCookies)
) =>
async () => {
  const user = await db.get("users", auth.userId);

  if (!user) {
    throw new Error("User is not found");
  }

  return user;
};

const authCookies = (
  cookies = Cookies(),
  headers = Headers()
) => () => {
  return cookies.get("auth");
}

app.post("/users", (
  body = Body(z.object({
    name: z.string(),
    age: z.number()
  })),
  db = Inject(Database)
) => async () => {
  const user = await db.create("users", body);
  return user;
})
