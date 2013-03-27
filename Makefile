
TESTS = test/spec
REPORTER = spec
XML_FILE = reports/TEST-all.xml
HTML_FILE = reports/coverage.html

test: test-mocha

test-ci:
	$(MAKE) test-mocha REPORTER=xUnit > $(XML_FILE)

test-all: test-ci test-cov

ui-test:
	casperjs test test/ui

test-mocha:
	@NODE_ENV=test mocha \
	    --timeout 200 \
		--reporter $(REPORTER) \
		$(TESTS)

test-cov: lib-cov
	@HFS_COV=1 $(MAKE) test-mocha REPORTER=html-cov > $(HTML_FILE)

lib-cov:
	jscoverage lib lib-cov

clean:
	rm -f reports/*
	rm -fr lib-cov
