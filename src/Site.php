<?php

final class Site {
    private $_pages;
    private $_navigation;

    private function __construct($pages, $navigation) {
        $this->_pages = $pages;
        $this->_navigation = $navigation;
    }

    public final static function create() {
        $pageFactory = new PageFactory();

        $pages['home'] = $pageFactory->home();
        $pages['music'] = $pageFactory->music();
        $pages['contact'] = $pageFactory->contact();
        $pages['software'] = $pageFactory->software();
        $pages['m4lWAI'] = $pageFactory->m4lWAI();
        $pages['m4lDSM'] = $pageFactory->m4lDSM();
        $pages['m4lMCM'] = $pageFactory->m4lMCM();
        $pages['wacNetworkMidi'] = $pageFactory->wacNetworkMidi();
        $pages['miniakPatchEditor'] = $pageFactory->miniakPatchEditor();

        $navigation = new Navigation($pages['home']);
        $navigation
            ->addItem($pages['music'])
            ->addDropdown('Software', array_merge(array($pages['software']), $pageFactory->linkedSoftwarePages()))
            ->addItem($pages['contact']);

        return new Site($pages, $navigation);
    }

    /**
     * Remove HTML pages from previous build
     */
    public function clearLastBuild() {
        $oldFiles = glob('site/*.html');
        foreach ($oldFiles as $oldFile) {
            if (is_file($oldFile)) {
                unlink($oldFile);
            }
        }
    }

    public function render() {
        ob_start();
        foreach ($this->_pages as $page) {
            $page->render($this->_navigation);
            file_put_contents('site/' . $page->filename(), ob_get_contents());
            ob_clean();
        }
        ob_end_clean();
    }
}
