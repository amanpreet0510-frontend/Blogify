<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

<xsl:template match="/">
<html>
<head>
  <title>XML Sitemap</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    h1 { color: #333; }
    table { border-collapse: collapse; width: 100%; }
    th, td { padding: 10px; border: 1px solid #ddd; }
    th { background: #f4f4f4; }
  </style>
</head>
<body>
  <h1>XML Sitemap - justblogify.in</h1>
  <table>
    <tr>
      <th>URL</th>
      <th>Last Modified</th>
      <th>Priority</th>
    </tr>

    <!-- FIXED LINE -->
    <xsl:for-each select="s:urlset/s:url">
      <tr>
        <td><xsl:value-of select="s:loc"/></td>
        <td><xsl:value-of select="s:lastmod"/></td>
        <td><xsl:value-of select="s:priority"/></td>
      </tr>
    </xsl:for-each>

  </table>
</body>
</html>
</xsl:template>

</xsl:stylesheet>