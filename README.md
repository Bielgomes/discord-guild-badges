# Discord Guild Cards

Discord Guild Cards is a highly customizable API that generates cards inspired by Discord invites, primarily intended for embedding in GitHub repositories.

## How it works

Using data retrieved by the Discord bot, such as server name, banner, icon, number of online and offline members, combined with custom parameters, the API builds an SVG card and returns it for display.

## How to Use

> [!IMPORTANT]
> For the bot to retrieve information from a Discord server, it must be a member of that server. [Add the bot to your server](https://discord.com/oauth2/authorize?client_id=1395943682498101318&permissions=0&integration_type=0&scope=bot).

> [!NOTE]
> If a guild does not have a server icon or banner, a default image will be used.

Embedding card in GitHub Markdown:

```
[![my guild card](https://guild-cards.discloud.app/api/DISCORD_GUILD_ID)](https://discord.gg/MY_INVITE_CODE)
```

### Some Examples

#### Default mode Card

[![default mode card](https://guild-cards.discloud.app/api/743482187365613641)](https://discord.gg/4hsS5V3Bgc)

#### Compact mode Card

[![compact mode card](https://guild-cards.discloud.app/api/743482187365613641?mode=compact)](https://discord.gg/4hsS5V3Bgc)

#### Default mode Card with some customizations

[![default mode card](https://guild-cards.discloud.app/api/743482187365613641?backgroundColor=DDDDDD&textColor=000000&statsTextColor=101010&borderRadius=0&buttonBorderRadius=0&buttonColor=000000)](https://discord.gg/4hsS5V3Bgc)

## Parameters

| Parameter            | Default Value     | Min - Max            | Description                                                   |
| -------------------- | ----------------- | -------------------- | ------------------------------------------------------------- |
| `mode`               | `default`         | `default-compact`  | Defines the card display type                                 |
| `format`             |                   | `png`                | Define card extension                                         |
| `textColor`          | `FFFFFF`          | `6`                  | Hex color of the server name text                             |
| `maxTextLen`         | `25`              | `0-50`               | Maximum length of the server name before ellipses are applied |
| `textEllipses`       | `...`             | `0-5`                | Suffix used when the server name is truncated                 |
| `statsTextColor`     | `BCC0C0`          | `6`                  | Hex color of the server stats text                            |
| `backgroundColor`    | `141414`          | `6`                  | Hex color of the card background                              |
| `iconBorderColor`    | `backgroundColor` | `6`                  | Hex color of the server icon border                           |
| `iconBorderRadius`   | `10`              | `0-25`               | Border radius of the server icon                              |
| `borderRadius`       | `4`               | `0-30`               | Border radius of the card                                     |
| `buttonColor`        | `00863A`          | `6`                  | Hex color of the invite button                                |
| `buttonText`         | `Join`            |                      | Text displayed inside the button                              |
| `maxButtonTextLen`   | `40`              | `0-100`              | Maximum length of the button text before ellipses are applied |
| `buttonTextEllipses` | `...`             | `0-5`                | Suffix used when the button text is truncated                 |
| `buttonTextColor`    | `FFFFFF`          | `6`                  | Hex color of the button text                                  |
| `buttonBorderRadius` | `6`               | `0-15`               | Border radius of the button                                   |

## Found a bug or have a suggestion?

Feel free to open an issue or submit a pull request 😁

## Contribuidores

<a href="https://github.com/bielgomes/discord-guild-cards/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bielgomes/discord-guild-cards" />
</a>
