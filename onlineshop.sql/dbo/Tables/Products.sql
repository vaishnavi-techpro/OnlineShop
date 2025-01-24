CREATE TABLE [dbo].[Products] (
    [Id]          INT            NOT NULL,
    [ProductName] NVARCHAR (100) NOT NULL,
    [Price]       DECIMAL (18)   NOT NULL,
    [CreatedOn] NVARCHAR(50) NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

