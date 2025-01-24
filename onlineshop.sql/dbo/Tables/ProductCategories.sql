CREATE TABLE [dbo].[ProductCategories] (
    [Id]         INT NOT NULL,
    [ProductId]  INT NOT NULL,
    [CategoryId] INT NOT NULL,
    [CreatedOn] NVARCHAR(50) NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

