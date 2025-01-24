CREATE TABLE [dbo].[Categories] (
    [Id]           INT            NOT NULL,
    [CategoryName] NVARCHAR (100) NOT NULL,
    [CreatedOn] NVARCHAR(50) NULL, 
    [ModifiedOn] NVARCHAR(50) NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

