# Lft Barebones

This document explains the reaons behind the arhcitectural decisions.

### JSON structures for CMS

The CMS is extracted from the existing cshtml documents into JSON data, removing ALL html references, and instead relating data with template types. These template types give the data a structure, but does not dictate how the data should be presented. It therefore makes the data available for use in any UI implementation.

