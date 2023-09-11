import { rest } from "msw";

const baseURL = "https://drf-foodies-api-1b38deb7eb8c.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
            "pk": 2,
            "username": "Kelly-J",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 2,
            "profile_image": "https://res.cloudinary.com/dugjc92qc/image/upload/v1/media/images/k-profile_dkwm6v",
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
       return res(ctx.status(200));
    }),
];