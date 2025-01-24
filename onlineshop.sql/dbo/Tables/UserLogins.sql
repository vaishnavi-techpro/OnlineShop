CREATE TABLE [dbo].[UserLogins] (
    [Id]       INT        NOT NULL,
    [UserId]   INT        NULL,
    [UserName] NCHAR (10) NULL,
    
    [Password] NVARCHAR(50) NULL, 
    [CreatedOn] DATETIME NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

