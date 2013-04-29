#!/usr/bin/env python
# -*- coding: utf-8 -*-
################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2006-2013 1&1 Internet AG, Germany, http://www.1und1.de
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Thomas Herchenroeder (thron7)
#
################################################################################

import sys, os, re

##
# Compiler Hints Support
#
# 'ignore' hints can have globs (like 'qx.test.*')
# This class provides a wrapper around those entries so you can immediately match
# agaist the regexp.
##

class HintArgument(object):

    def __init__ (self, source=""):
        self.source = source  # "qx/test/*"
        so = re.escape(source)  # for '.', '$'
        so = so.replace(r'\*', '.*')  # re-activate '*'
        self.regex = re.compile(r'^%s$' % so) # re.compile("qx\.test\.*")

    ##
    # Overloading __eq__ so that 'in' tests will use a regex match
    def __eq__ (self, other):
        return self.regex.match(other)



