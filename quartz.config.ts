import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Arch🏛️Tech🤖",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Gothic A1, Bold",
        body: "Gowun Dodum",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f1eee6", //배경
          lightgray: "#ffffffff", //보조 배경
          gray: "#aaaaaaff",
          darkgray: "#222222ff", // 글색
          dark: "#111111ff", // 제목 색
          secondary: "#000000ff", // 강조 색 
          tertiary: "#e5b8a9", //블럭
          highlight: "#cbcadb",
          textHighlight: "#eacfc1", //하이라이트
        },
        darkMode: {
          light: "#292929ff",  // 배경
          lightgray: "#000000ff", // 보조 배경
          gray: "#646464",
          darkgray: "#d4d4d4", // 글색
          dark: "#ffffffff",  // 제목 색
          secondary: "#ffffffff", // 강조 색
          tertiary: "#e5b8a9",
          highlight: "#cbcadb",
          textHighlight: "#e5b8a96a",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
