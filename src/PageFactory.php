<?php

class PageFactory {
    private $_maxForLive;
    private $_abletonLive;
    private $_maxMSP;

    private $_cache = array();

    public function __construct() {
        $this->_maxForLive = Link::external('Max For Live', 'http://www.ableton.com/maxforlive');
        $this->_abletonLive = Link::external('Ableton Live', 'http://www.ableton.com');
        $this->_maxMSP = Link::external('MaxMSP', 'http://www.cycling74.com/');
    }

    private function _cached() {
        return isset($this->_cache[debug_backtrace()[1]['function']]);
    }

    private function _fromCache() {
        return $this->_cache[debug_backtrace()[1]['function']];
    }

    private function _store($page) {
        $this->_cache[debug_backtrace()[1]['function']] = $page;
    }

    public function home() {
        $this->_cached();
        if (!$this->_cached()) {
            $title = 'ChipPanFire';
            $href = 'index.html';
            $this->_store(new InternalPage($title, $href, new SimpleContent('content-homepage.phtml')));
        }

        return $this->_fromCache();
    }

    public function music() {
        if (!$this->_cached()) {
            $title = 'Music';
            $href = 'music.html';
            $this->_store(new InternalPage($title, $href, new SimpleContent('content-music.phtml')));
        }

        return $this->_fromCache();
    }

    public function contact() {
        if (!$this->_cached()) {
            $title = 'Contact';
            $href = 'contact.html';
            $this->_store(new InternalPage($title, $href, new SimpleContent('content-contact.phtml')));
        }

        return $this->_fromCache();
    }

    public function software() {
        if (!$this->_cached()) {
            $title = 'Software Overview';
            $href = 'software.html';
            $this->_store(new InternalPage($title, $href, new SoftwareHomeContent($this->linkedSoftwarePages())));
        }

        return $this->_fromCache();
    }

    public function linkedSoftwarePages() {
        return array(
            $this->m4lDSM(),
            $this->m4lWAI(),
            $this->m4lMCM(),
            $this->kmkControlScript(),
            $this->wacNetworkMidi(),
            $this->miniakPatchEditor(),
            $this->chipPanFire(),
        );
    }

    public function m4lDSM() {
        if (!$this->_cached()) {
            $title = 'Device Snapshot Manager';
            $href = 'software-m4l-device-snapshot-manager.html';
            $strapline = $this->_maxForLive . ' device that adds the ability to store and recall ‘snapshots’ of Ableton Live devices in realtime';
            $content = new SoftwareContent('content-devicesnapshotmanager.phtml', 'http://www.chippanfire.com/cpf_media/software/dsm-screenshot.jpg', 'DeviceSnapshotManager.pdf');
            $this->_store(new InternalPage($title, $href, $content, $strapline));
        }

        return $this->_fromCache();
    }

    public function m4lWAI() {
        if (!$this->_cached()) {
            $title = 'Where Am I';
            $href = 'software-m4l-where-am-i.html';
            $strapline = $this->_maxForLive . ' utility device that displays Live API information for the currently selected element of the Ableton Live interface';
            $content = new SoftwareContent('content-whereami.phtml', 'http://www.chippanfire.com/cpf_media/software/wai-screenshot.jpg', 'WhereAmI.pdf');
            $this->_store(new InternalPage($title, $href, $content, $strapline));
        }

        return $this->_fromCache();
    }

    public function m4lMCM() {
        if (!$this->_cached()) {
            $title = 'MIDI Clip Modulo';
            $href = 'software-m4l-midi-clip-modulo.html';
            $strapline = $this->_maxForLive . " utility device that adds extra functionality to note editing in Ableton Live's MIDI clips.";
            $content = new SoftwareContent('content-midiclipmodulo.phtml', 'http://www.chippanfire.com/cpf_media/software/midi-clip-modulo.jpg', 'MidiClipModulo.pdf');
            $this->_store(new InternalPage($title, $href, $content, $strapline));
        }

        return $this->_fromCache();
    }

    public function wacNetworkMidi() {
        if (!$this->_cached()) {
            $title = 'Wac Network MIDI';
            $href = 'software-wac-network-midi.html';
            $strapline = 'Cross-platform (Win and OSX) tool built with ' . $this->_maxMSP . ' for transmitting MIDI from one computer to another via a network, without the need for hardware MIDI interfaces.';
            $content = new SoftwareContent('content-wacnetworkmidi.phtml', 'http://www.chippanfire.com/cpf_media/software/wac-network-midi.png', 'wacNetworkMIDI.pdf');
            $this->_store(new InternalPage($title, $href, $content, $strapline));
        }

        return $this->_fromCache();
    }

    public function miniakPatchEditor() {
        if (!$this->_cached()) {
            $title = 'Miniak Patch Editor';
            $href = 'software-miniak-patch-editor.html';
            $strapline = 'Patch editor/management tool for the '. Link::external('Akai Miniak', 'http://www.akaipro.com/product/miniak') . ' (and the ' . Link::external('Alesis Micron', 'http://www.vintagesynth.com/misc/micron.php') . ')';
            $content = new SoftwareContent('content-miniakpatcheditor.phtml', 'http://www.chippanfire.com/cpf_media/software/miniak-patch-editor.jpg', 'MPE-Documentation.pdf');
            $this->_store(new InternalPage($title, $href, $content, $strapline));
        }

        return $this->_fromCache();
    }

    public function kmkControlScript() {
        if (!$this->_cached()) {
            $title = 'KMK Control Script';
            $href = 'https://github.com/crosslandwa/kmkControl';
            $strapline = 'In-depth control of ' . $this->_abletonLive . ' using the Korg Microkontrol (greatly improved on that offered natively).';
            $this->_store(new ExternalPage($title, $href, $strapline));
        }

        return $this->_fromCache();
    }

    public function chipPanFire() {
        if (!$this->_cached()) {
            $title = 'ChipPanFire site';
            $href = 'https://github.com/crosslandwa/chippanfire-site';
            $strapline = 'Totally meta, see the source code for generating this site!';
            $this->_store(new ExternalPage($title, $href, $strapline));
        }

        return $this->_fromCache();
    }
}
