const tokenizer = require('string-tokenizer')

const commandParser = (commandText) => {
    const tokens = tokenizer()
      .input(commandText)
      .token('command', /(list)|(get [a-z_]+)|(save [a-z_]+)/)
      .token('theme_colors', /(\")?(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))+(\")?/, match => match[1])
      .resolve()

    return {
        command: tokens.command,
        themeColors: tokens.theme_colors
    }
}

module.exports = commandParser