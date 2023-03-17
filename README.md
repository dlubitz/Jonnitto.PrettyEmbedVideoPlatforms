[![Latest stable version]][packagist] [![Total downloads]][packagist] [![License]][packagist] [![GitHub forks]][fork] [![Donate Paypal]][paypal] [![Wishlist amazon]][amazon] [![GitHub stars]][stargazers] [![GitHub watchers]][subscription] [![GitHub followers]][followers] [![Follow Jon on Twitter]][twitter]

# Jonnitto.PrettyEmbedVideoPlatforms

Prettier embeds for your Vimeo videos and YouTube videos/playlists in [Neos CMS] - with helpful options like high-res preview images, lightbox feature, and advanced customization of embed options.

| Version | Neos        | Maintained |
| ------- | ----------- | :--------: |
| 1.\*    | 4.2.\*, > 5 |      ✗     |
| 2.\*    | >= 5.3      |      ✗     |
| 3.\*    | >= 5.3      |      ✓     |

## Installation

Most of the time, you have to make small adjustments to a package (e.g., configuration in `Settings.yaml`). Because of that, it is essential to add the corresponding package to the composer from your theme package. Mostly this is the site package located under `Packages/Sites/`. To install it correctly go to your theme package (e.g.`Packages/Sites/Foo.Bar`) and run following command:

```bash
composer require jonnitto/prettyembedvideoplatforms --no-update
```

The `--no-update` command prevent the automatic update of the dependencies. After the package was added to your theme `composer.json`, go back to the root of the Neos installation and run `composer update`. Et voilà! Your desired package is now installed correctly.

## FAQ

**What are the differences from the PrettyEmbed series to [Jonnitto.Plyr]?**

|                                    | PrettyEmbed series |  Plyr  |
| ---------------------------------- | :----------------: | :----: |
| YouTube Video                      |         ✓          |   ✓    |
| YouTube Playlist                   |         ✓          |        |
| Vimeo                              |         ✓          |   ✓    |
| Native Audio                       |         ✓          |   ✓    |
| Native Video                       |         ✓          |   ✓    |
| Advanced captions for native video |         ✓          |        |
| Preview image                      |         ✓          |        |
| Lightbox included                  |         ✓          |        |
| Preview image (for videos)         |         ✓          |        |
| Javascript API                     |                    |   ✓    |
| Filesize (JS & CSS)                |      smaller       | bigger |

All packages from the PrettyEmbed series have the benefit of a better frontend performance since the player gets only loaded on request. So, no iframe/video gets loaded until the user wants to watch a video.

## Customization

### [Settings.Jonnitto.yaml]

#### JS API / Usage of youtube-nocookie.com

If you want to use the JavaScript API from youtube (e.g., for tracking), you have to enable set `enableJsApi` to `true`.

```yaml
Jonnitto:
  PrettyEmbedVideoPlatforms:
    enableJsApi: true
```

per default, the youtube-nocookie.com domain is used for embedding YouTube videos.

```yaml
Jonnitto:
  PrettyEmbedVideoPlatforms:
    youtube:
      playlist:
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=%id%'
        href: 'https://www.youtube.com/playlist?list=%id%'
      video:
        embed: 'https://www.youtube-nocookie.com/embed/%id%'
        href: 'https://www.youtube.com/watch?v=%id%'
```

Be aware that you need to provide the placeholder for the ID (`%id%`) of the playlist or video.

#### Global settings for the whole PrettyEmbed series

Some settings will be set globally from the [PrettyEmbedHelper] package. These are the default settings:

```yaml
Jonnitto:
  PrettyEmbedHelper:
    # If you want to use your own assets, set this to false (Backend.js and Backend.css will be always be included in the backend)
    includeAssets:
      css: true
      js: true

    # If you want to save the duration of YouTube videos and playlists into the
    # property metadataDuration you have to add a API key from YouTube Data API v3
    # You can create this key on https://console.cloud.google.com/
    youtubeApiKey: null

    # For Vimeo and Youtube you can enable here the option the show a confirm dialog
    # that external content get loaded and the user may be tracked
    enableGdprMessage: false

    # This is the maximum width of a custom preview image
    maximumWidth: 1920

    # If this is set to a string, the element gets wrapped with a div and the class with the giving string.
    # If set to true, the element gets wrapped with a div without any class.
    # If set to false, the element get not wrapped at all
    wrapper: 'jonnitto-prettyembed-wrapper'

    # The buttons which get injected (file content) to the player.
    button:
      play: 'resource://Jonnitto.PrettyEmbedHelper/Public/Assets/PlayButton.svg'
      pause: 'resource://Jonnitto.PrettyEmbedHelper/Public/Assets/PauseButton.svg'
```

#### Disable inclusion of the CSS and/or JS files

The Javascript and CSS files get loaded via [Sitegeist.Slipstream]:

If you want to load your own CSS, you can disable it like that:

```yaml
Jonnitto:
  PrettyEmbedHelper:
    includeAssets:
      css: false
```

If you want to load your own Javascript, you can disable it like that:

```yaml
Jonnitto:
  PrettyEmbedHelper:
    includeAssets:
      js: false
```

If you use SCCS in your build pipeline, you can adjust the look and feel of [`Main.scss`] with following variables:

```scss
// Buttons (play / pause)
$prettyembed-button-play-size: 72px !default;
$prettyembed-button-pause-size: calc($prettyembed-button-play-size / 2) !default;
$prettyembed-button-pause-margin: calc($prettyembed-button-pause-size / 2) !default;
$prettyembed-button-opacity: 0.9 !default;
$prettyembed-button-scale: 0.8 !default;
$prettyembed-button-scale-hover: 1 !default;
$prettyembed-button-scale-active: 0.9 !default;
$prettyembed-button-foreground-color: #fff !default;
$prettyembed-button-background-color: #000 !default;
$prettyembed-button-background-opactiy: 0.4 !default;

// Lightbox
$prettyembed-lightbox-include: true !default;
$prettyembed-lightbox-overlay-color: #0b0b0b !default;
$prettyembed-lightbox-overlay-opacity: 0.8 !default;
$prettyembed-lightbox-padding: 15px !default;
$prettyembed-lightbox-max-width: 900px !default;
$prettyembed-lightbox-shadow: 0 0 8px rgba(#000, 0.6) !default;
$prettyembed-lightbox-z-index: 5500 !default;
$prettyembed-lightbox-close-size: 30px !default;
$prettyembed-lightbox-close-opacity: 0.65 !default;
$prettyembed-lightbox-close-opacity-hover: 1 !default;
$prettyembed-lightbox-close-color: #fff !default;
$prettyembed-lightbox-backdrop-filter: blur(5px) !default;

// GDPR Message
$prettyembed-gdpr-include: true !default;
$prettyembed-gdpr-color: #fff !default;
$prettyembed-gdpr-font-size-breakpoint: 640px !default;
$prettyembed-gdpr-font-size-mobile: 0.8rem !default;
$prettyembed-gdpr-font-size: 1rem !default;
$prettyembed-gdpr-gap: 1em !default;
$prettyembed-gdpr-padding: 0.5em !default;
$prettyembed-gdpr-explantation-font-size: 0.9em !default;
$prettyembed-gdpr-explantation-max-width: 60ch !default;
$prettyembed-gdpr-button-gap: 1em !default;
$prettyembed-gdpr-button-padding: 0.5em 1em !default;
$prettyembed-gdpr-button-border-radius: 0.25em !default;

$prettyembed-gdpr-button-accept-color: #fff !default;
$prettyembed-gdpr-button-accept-background-color: #16a34a !default;
$prettyembed-gdpr-button-accept-border: 1px solid #16a34a !default;
$prettyembed-gdpr-button-accept-color-hover: #fff !default;
$prettyembed-gdpr-button-accept-background-color-hover: #15803d !default;
$prettyembed-gdpr-button-accept-border-color-hover: #15803d !default;

$prettyembed-gdpr-button-external-color: #fff !default;
$prettyembed-gdpr-button-external-background-color: transparent !default;
$prettyembed-gdpr-button-external-border: 1px solid #fff !default;
$prettyembed-gdpr-button-external-color-hover: #000 !default;
$prettyembed-gdpr-button-external-background-color-hover: #fff !default;
$prettyembed-gdpr-button-external-border-color-hover: false !default;

$prettyembed-gdpr-backdrop-filter: blur(5px) !default;
$prettyembed-gdpr-overlay-color: #0b0b0b !default;
$prettyembed-gdpr-overlay-opacity: 0.8 !default;
```

Because all variables have the `!default` flag, the variables don't get overwritten if you declare
them before you import [`Main.scss`]. Like that, most of the frequent adjustments can be easily achieved.

### NodeTypes and Mixins

If you want to customize the default settings, take a look at the [Settings.Jonnitto.yaml] file.
If no node property is given, these default values will be taken. If you, for example, want to let
the editor choose if the video is allowed to play the video in fullscreen or not, you can activate
the mixin in your Configuration folder like this:

```yaml
'Jonnitto.PrettyEmbedVideoPlatforms:Content.Video':
  superTypes:
    'Jonnitto.PrettyEmbedHelper:Mixin.AllowFullScreen': true
```

These are the available mixins:

| Mixin name (Prefix: `Jonnitto.PrettyEmbed`)              | Description                                                                 | Default value | Enabled per default |
| -------------------------------------------------------- | --------------------------------------------------------------------------- | :-----------: | :-----------------: |
| `Helper:Mixin.Groups`                                    | Enables the inspector groups                                                |               |          ✓          |
| `Helper:Mixin.Image`                                     | Add the preview image property                                              |               |          ✓          |
| `Helper:Mixin.Lightbox`                                  | Open the video in a lightbox                                                |    `false`    |          ✓          |
| `Helper:Mixin.PreserveAspectRatio`                       | If the lightbox is active, the preview image can preserve his aspect ratio. |    `true`     |          ✓          |
| `Helper:Mixin.BackendLabel`                              | Read the title of the video and set this as label in the content tree       |               |          ✓          |
| `VideoPlatforms:Mixin.VideoID`                           | Let the user enter the video ID or the URL                                  |               |          ✓          |
| `Helper:Mixin.AllowFullScreen`                           | Allow fullscreen or not                                                     |    `true`     |                     |
| `Helper:Mixin.Loop`                                      | Loop the video                                                              |    `false`    |                     |
| `Helper:Mixin.Controls`                                  | Show the controls                                                           |    `true`     |                     |
| `PrettyEmbedVideoPlatforms:Mixin.Youtube.ClosedCaptions` | Show captions                                                               |    `false`    |                     |
| `PrettyEmbedVideoPlatforms:Mixin.Youtube.ShowRelated`    | If `false`, show only related videos that are from the same channel         |    `false`    |                     |

If you want to include the video in your node type, you should use at least the mixin `Jonnitto.PrettyEmbedVideoPlatforms:Mixin.VideoID`. This add besides the `videoID` property also the properties for the metadata fetched from the oembed service. This mixin is also necessary to fetch/update the data from the service.

### Fusion

If you want to use the player as a pure component, you can use the [`Jonnitto.PrettyEmbedVideoPlatforms:Component.Video`] fusion prototype.

If you want to read the node properties and let the package handle all for you, you should use the [`Jonnitto.PrettyEmbedVideoPlatforms:Content.Video`] prototype. For more comfortable including in your node types, you can disable the content element wrapping with `contentElement = false`. This is useful if you want to create, for example, a text with a video node type.

If you want to parse an existing content with iframes and replace them automatically, you can add [`Jonnitto.PrettyEmbedVideoPlatforms:ReplaceIframes`] with an `@process` like that: `@process.replaceIframes = Jonnitto.PrettyEmbedVideoPlatforms:ReplaceIframes`. The `content` property is per default set to `${value}`.

## Get metadata

To get the metadata, you can run the flow command `./flow prettyembed:metadata`. This command search for nodes with the `VideoID` mixin, and tries to get the metadata. If for some reason, it is not possible to fetch the metadata (Perhaps the video is set to private, or the ID does not exist), you will get a table with the name of the node type, the type, the video ID and the node path.  
The task comes with two options:

- `--workspace` Workspace name, default is 'live'
- `--remove` Is set, all metadata will be removed

To get an overview of the options in the cli, you can run `./flow help prettyembed:metadata`

## Merge PrettyEmbedYoutube and PrettyEmbedVimeo

If you want existing nodes from [PrettyEmbedYoutube] and [PrettyEmbedVimeo] use this package,
you have to run following command in your cli:  
`./flow node:migrate --version 20200420033756`

After this migration you have to flush your frontend cache:  
`./flow cache:flushone --identifier Neos_Fusion_Content`

## PrettyEmbedCollection

This package is member of the [PrettyEmbedCollection] which contains following packages:

- [PrettyEmbedVideo]
- [PrettyEmbedVideoPlatforms]

If you install the PrettyEmbedCollection, the video players get grouped into an own group in the node-inspector; otherwise, they will be in the default group.

[packagist]: https://packagist.org/packages/jonnitto/prettyembedvideoplatforms
[latest stable version]: https://poser.pugx.org/jonnitto/prettyembedvideoplatforms/v/stable
[total downloads]: https://poser.pugx.org/jonnitto/prettyembedvideoplatforms/downloads
[license]: https://poser.pugx.org/jonnitto/prettyembedvideoplatforms/license
[github forks]: https://img.shields.io/github/forks/jonnitto/Jonnitto.PrettyEmbedVideoPlatforms.svg?style=social&label=Fork
[donate paypal]: https://img.shields.io/badge/Donate-PayPal-yellow.svg
[wishlist amazon]: https://img.shields.io/badge/Wishlist-Amazon-yellow.svg
[amazon]: https://www.amazon.de/hz/wishlist/ls/2WPGORAVYF39B?&sort=default
[paypal]: https://www.paypal.me/Jonnitto/20eur
[github stars]: https://img.shields.io/github/stars/jonnitto/Jonnitto.PrettyEmbedVideoPlatforms.svg?style=social&label=Stars
[github watchers]: https://img.shields.io/github/watchers/jonnitto/Jonnitto.PrettyEmbedVideoPlatforms.svg?style=social&label=Watch
[github followers]: https://img.shields.io/github/followers/jonnitto.svg?style=social&label=Follow
[follow jon on twitter]: https://img.shields.io/twitter/follow/jonnitto.svg?style=social&label=Follow
[twitter]: https://twitter.com/jonnitto
[fork]: https://github.com/jonnitto/Jonnitto.PrettyEmbedVideoPlatforms/fork
[stargazers]: https://github.com/jonnitto/Jonnitto.PrettyEmbedVideoPlatforms/stargazers
[subscription]: https://github.com/jonnitto/Jonnitto.PrettyEmbedVideoPlatforms/subscription
[followers]: https://github.com/jonnitto/followers
[neos cms]: https://www.neos.io
[prettyembedcollection]: https://github.com/jonnitto/Jonnitto.PrettyembedCollection
[prettyembedvimeo]: https://github.com/jonnitto/Jonnitto.PrettyEmbedVimeo
[prettyembedyoutube]: https://github.com/jonnitto/Jonnitto.PrettyEmbedYoutube
[prettyembedhelper]: https://github.com/jonnitto/Jonnitto.PrettyEmbedHelper
[prettyembedvideo]: https://github.com/jonnitto/Jonnitto.PrettyEmbedVideo
[prettyembedvideoplatforms]: https://github.com/jonnitto/Jonnitto.PrettyEmbedVideoPlatforms
[jonnitto.plyr]: https://github.com/jonnitto/Jonnitto.Plyr
[settings.jonnitto.yaml]: Configuration/Settings.Jonnitto.yaml
[`jonnitto.prettyembedvideoplatforms:component.video`]: Resources/Private/Fusion/Component/Video.fusion
[`jonnitto.prettyembedvideoplatforms:content.video`]: Resources/Private/Fusion/Content/Video.fusion
[`jonnitto.prettyembedvideoplatforms:replaceiframes`]: Resources/Private/Fusion/ReplaceIframes.fusion
[sitegeist.slipstream]: https://github.com/sitegeist/Sitegeist.Slipstream
[`main.scss`]: https://github.com/jonnitto/Jonnitto.PrettyEmbedHelper/blob/master/Resources/Private/Assets/Main.scss
