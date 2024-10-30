This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
# Project created with Next.ts, Node,js

### Deployed on [render.com](https://render.com)

# `Next.js`

### Directory app


This directory include folders of pages and component folder

### `sign-up`

#### Have LaziLoading for SignUpForm and VerifyForm

`const SignUpFrom = dynamic(() => import("../components/SignUpFrom/SignUpFrom"), {loading: () => <Loader/>, ssr: false})`

`const VerifyForm = dynamic(() => import('../components/VerifyForm/VerifyForm'), {loading: () => <Loader/>, ssr: false})`


#### Callback function for `SignUpForm` component

####  const formSuccess = (formResponse: boolean, allUserInfo: UserInfo) => {
    return setFromAnswer({ response: formResponse, allUserInfo: allUserInfo });
  };

### SignUpFrom component

using `useForm()` with basic values `register,
    handleSubmit,
    formState: { errors },
    getValues`
it return type `UserInfo`

### `formSubmit()`

Feature try post request with request body `{ email: data.email }` ( data - values from form )

Then it call `formSuccess()`, it has name `callback`

#### Form validate

Email input have simple validate: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

Password have validate for only English letters: `/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/`

and validate for length: `minLength: { value: 6, message: "Password must be at least 6 characters" }`

Confirm Password have validate with similarity with password: `validate: (value) => `

            {              
              const { password } = getValues();
              return password === value || "Passwords do not match";
  
            }

### VerifyForm component

It's appears after `formSuccess()` send `{ success: true }`

#### `{ setUserLogined } = useHeaderContext()`

Hook from `Header Context` that change value in Header component

#### `formSubmit()`

Try post request that send `email, code, user` to Backend

Then set items in `localStorage`: `userName`, `userEmail`

After that code use context `setUserLogined(allUserInfo.name)`

So after success verify code redirect user to `HomePage`

### `sign-in`

Have similar functions but only one object send to Backend
`{ email: with user email, password: with user password } `  

### Home Page

Have one `useEffect()` that have array of dependencies `[deleteClick]`

`useEffect()` have get request `getArticles` then `map()` response and create `<HomeCard />` component

#### HomeCard component

Have function `deleteArticle()` that send `id` of article and then set state of click `setDeleteClick(!deleteClick)`

For redirect uses `window.location.origin` and `id` of item

If user didn't create this article `delete button` don't show

### `create`

Create article form form that on submit send `userEmail: localStorage.userEmail,
        articleTitle: values.title,
        articleText: values.text,
        articleDescription: values.description`
Then redirect to Home Page

#### Form validate

Have simple validate: `title, description` min length 3, `text` is required filed


### `article/[id]`

When user navigate to some article this page is showing

#### `getArticle()`

Simple get request for getting data
`{ title, creator, description, text }`

### Header component

If user don't logined `Create article` button don't show

And show `Sign in, Sign up` buttons

#### HeaderLogoutButton

Use HeaderContext

Have one functio `logoutUser()` that set empty string to our context and clear localStorage
` {
    setUserLogined("");
    localStorage.clear();
  } `

#### HeaderProvider component

It's component for created context

```
export const HeaderContext = createContext<HeaderContextType>({
  //create context
  userLogined: "",
  setUserLogined: (name: string) => {},
});
```

Then create state for context 
```
const [userLogined, setUserLogined] = useState<string>("");
 ```

Have `useEffect()` that check `localStorage`

```
useEffect(() => {
    if (localStorage.userName) {
      setUserLogined(localStorage.userName);
    }
  }, []);
```
Context component
```
<HeaderContext.Provider value={{ userLogined, setUserLogined }}>
      {children}
    </HeaderContext.Provider>
```

### `reset-password/[id]`

Have formSubmit function that send user `id` and new password

```
const formSubmit: SubmitHandler<{
    password: string;
    confirm_password: string;
  }> = async (data: { password: string }) => {
    const { id } = params;
    const dataForRequest = { id: id, newPassword: data.password };
    try {
      await axios.post(`${apiUrl}/resetPassword`, dataForRequest);
      router.replace('/sign-in');
    } catch (err: any) {
      const { message } = err.response.data;
      setErrorMessage(message);
    }
  };
```

# Node.js

With Node.js code use `crypto`, `nodemailer`, `cors`, `express`

## `connectToDB`

File that have function with the same name

For DB used `MongoDb`

### After connect to DB code have actions

#### `findAll`

Find all users in `Users_info` collection

```
const data = await usersCollection.find({}).toArray();
```

#### `addUser`

Use `insertOne` to add user in DB
```
const result = await usersCollection.insertOne(userData);
```

#### `findOne`

Find user by email

```
const result = await usersCollection.findOne({ email: userData.email });
```
#### `updateById`

Update info of user in DB by id
and change user's password 

Use `findOneAndUpdate` 
```
 const result = await usersCollection.findOneAndUpdate(
        { _id: new ObjectId(userData.id) },
        { $set: { password: userData.password } },
        { new: true }
      );
```

#### `updateByEmail`

Similar with `updateById` but push new `article id` in user's `articles_id` array

### `findAllArticles` `findArticleById`

The similar functions with user functions

### `deleteArticle` 

Delete article from DB by `id`
```
const result = await articlesCollection.deleteOne({_id: new ObjectId(userData.id)});
```

### Export

```
module.exports = { connectToDB };
```






## `signUpConfirm`

### Post request that take `email` from `req.body` and then create verify code  by `crypto` 
```
const { email } = req.body;
  const code = crypto.randomBytes(3).toString("hex");
```
Then code try send message on user email and save verifyCode in array

```
verifyCode = { ...verifyCode, [email]: code };
    let info = await transporter.sendMail({
      from: `"Junior Forum" ${process.env.GOOGLE_ACCOUNT}`,
      to: email,
      subject: "Verify your email",
      text: `Your verify code: ${code}`,
    });
```

## `verifyCode`

Check verify code from user and then add user in DB

```
if (code === verifyCode[email]) {
    res.status(200).send({ success: true, message: "Verify completed" });
    let newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    await connectToDB("addUser", newUser);
```
## `sign-in`

Similar with `sign-up` but don't send verify code to email

## `forgot-password`

Check if user exist and then send reset link to email by nodemailer

```
 await transporter.sendMail({
        from: `"Junior Forum" ${process.env.GOOGLE_ACCOUNT}`,
        to: email,
        subject: "Reset password link",
        html: `<p>Hi, ${existingUser.name},</p>
        <p>Here's your password recovery link</p>
        <a href=${origin}/reset-password/${existingUser._id}>Reset password here</a>
        <p>Best regards, Libertas</p>`,
      });
```
## `resetPassword`

Update user password, find user by id

```
 await connectToDB("updateById", { id: id, password: newPassword });
```
## `createArticle`

Add new article in DB with `title, description, text, creator, creatorEmail` ( creator - user name )

```
const { name } = await connectToDB("findOne", { email: userEmail });
const data = await connectToDB("addArticle", {
      title: articleTitle,
      description: articleDescription,
      text: articleText,
      creator: name,
      creatorEmail: userEmail
    });
```

## `getArticles`

Get all articles from DB 

```
const data = await connectToDB("findAllArticles");
```

## `getArticle/:id`

Similar with `getArticles` but find current article by `id`
```
const data = await connectToDB("findArticleById", { id: req.params.id });
```

## `deleteArticle`

Similar with `getArticle/:id`


# Additional libraries

### `TailwindCSS`



