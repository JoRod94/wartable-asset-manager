# Wartable Asset Manager

## Description

Wartable Asset Manager is a helper app that I use to manage the models in my 3D tabletop project, [Wartable](https://wartable.herokuapp.com/) (not open source yet). Since Wartable doesn't have its own assets, the user is supposed to provide their own content URLs. If the user has their assets in an S3 bucket, this app is supposed to make it easier to view and edit its contents, and get the final JSON input to use in Wartable.

These models are in the STL format. This app should let the user see their STL models, upload new ones, delete models (WIP), and rename them (WIP).

![Screenshot from 2022-01-09 00-21-38](https://user-images.githubusercontent.com/6796936/148664418-002601d6-bf78-4b06-90dd-bc462b350799.png)
![Screenshot from 2022-01-09 00-31-08](https://user-images.githubusercontent.com/6796936/148664570-d50f9c95-d05a-4427-aae7-5a44ea62cbcd.png)




## Required Environment Variables

- **S3_UPLOAD_KEY** - AWS S3 key credential (separate IAM account recommended)
- **S3_UPLOAD_SECRET** - AWS S3 secret credential (separate IAM account recommended)
- **S3_UPLOAD_BUCKET** - AWS S3 bucket name, where you keep th e
- **S3_UPLOAD_REGION** - AWS region

## Required Permissions

**Note:** ALWAYS use a bucket dedicated ONLY for this purpose, since it should be publicly viewable.

In order to successfully view and manipulate content, your S3 bucket must have some permissions set up.

This app makes use of [`next-s3-upload`](https://github.com/ryanto/next-s3-upload), so check out its required permissions in the README, and add "GET" as an AllowedMethod in the CORS setup.

As for the remaining permissions, Wartable requires that your bucket is publicly viewable, so this project assumes that all assets are public and accesses them with a simple GET (again, only keep Wartable assets in this bucket). To make the bucket publicly viewable, add the following bucket policy in your bucket Permissions settings:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::dnd-tabletop-assets/*"
        }
    ]
}
```

And you settings should be defined like so:

![Screenshot from 2022-01-08 20-33-15](https://user-images.githubusercontent.com/6796936/148664423-647e252f-b4ac-48f5-8022-932490e95f17.png)

## Running the project

Install dependencies with `npm install`.

Run the project in development mode with `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project running.


## To-do
- Add proper testing with Cypress
- Add delete feature
- Add rename feature
- Move size limit to env var

